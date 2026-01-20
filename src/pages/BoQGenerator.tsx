
import React, { useState } from 'react';
import { Table, Button, Space, Typography, Popconfirm } from 'antd'; 
import { PlusOutlined, EditOutlined, DeleteOutlined, FileAddOutlined, ThunderboltOutlined } from '@ant-design/icons';
import useBoqStore, { type BoQItem } from '../store/boqStore';
import AddEditBoQItemModal from '../components/AddEditBoQItemModal';
import AIAnalysisModal from '../components/AIAnalysisModal'; // Import the new modal

const { Title, Text } = Typography;

const BoQGenerator: React.FC = () => {
  const { items, removeItem, analyzeBoq } = useBoqStore();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isAnalysisModalVisible, setIsAnalysisModalVisible] = useState(false); // State for the new modal
  const [editingItem, setEditingItem] = useState<BoQItem | null>(null);
  const [parentKey, setParentKey] = useState<string | null>(null);

  const showAddModal = (parentId: string | null = null) => {
    setEditingItem(null);
    setParentKey(parentId);
    setIsModalVisible(true);
  };

  const showEditModal = (item: BoQItem) => {
    setEditingItem(item);
    setParentKey(null);
    setIsModalVisible(true);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
    setEditingItem(null);
    setParentKey(null);
  };

  const handleAnalysis = () => {
    analyzeBoq(); // Trigger the analysis in the store
    setIsAnalysisModalVisible(true);
  };

  const columns = [
    { title: 'Item', dataIndex: 'item', key: 'item' },
    { title: 'Description', dataIndex: 'description', key: 'description', width: '30%' },
    { title: 'Unit', dataIndex: 'unit', key: 'unit', align: 'center' as const, width: 80 },
    { 
      title: 'Quantity', 
      dataIndex: 'quantity', 
      key: 'quantity', 
      align: 'right' as const, 
      render: (val: number) => val.toLocaleString() 
    },
    {
      title: 'Rate',
      dataIndex: 'rate',
      key: 'rate',
      align: 'right' as const,
      render: (val: number) => `Rp ${val.toLocaleString()}`,
    },
    {
        title: 'Amount',
        key: 'amount',
        align: 'right' as const,
        render: (_: unknown, record: BoQItem) => { 
            const amount = (record.quantity || 0) * (record.rate || 0);
            return <Text strong>{`Rp ${amount.toLocaleString()}`}</Text>;
        },
    },
    {
        title: 'Actions',
        key: 'actions',
        align: 'center' as const,
        width: 150,
        render: (_: unknown, record: BoQItem) => ( 
            <Space>
                <Button size="small" icon={<EditOutlined />} onClick={() => showEditModal(record)} />
                <Button size="small" icon={<FileAddOutlined />} onClick={() => showAddModal(record.key)} />
                <Popconfirm
                    title="Delete this item?" 
                    description="This will also delete all sub-items."
                    onConfirm={() => removeItem(record.key)}
                    okText="Yes"
                    cancelText="No"
                >
                    <Button size="small" danger icon={<DeleteOutlined />} />
                </Popconfirm>
            </Space>
        )
    }
  ];

  const calculateTotal = (data: readonly BoQItem[]): number => {
    let total = 0;
    data.forEach(item => {
        total += (item.quantity || 0) * (item.rate || 0);
        if (item.children) {
            total += calculateTotal(item.children);
        }
    });
    return total;
  };

  return (
    <div>
      <Title level={4}>Intelligent Bill of Quantity (BoQ) Generator</Title>
      <Space style={{ marginBottom: 16 }}>
        <Button type="primary" icon={<PlusOutlined />} onClick={() => showAddModal(null)}>
          Add Top-Level Item
        </Button>
        <Button icon={<ThunderboltOutlined />} onClick={handleAnalysis}>
            Analyze with AI
        </Button>
      </Space>
      <Table
        columns={columns}
        dataSource={items}
        rowKey="key"
        pagination={false}
        bordered
        summary={() => {
            const totalProjectCost = calculateTotal(items);
            return (
              <Table.Summary.Row>
                <Table.Summary.Cell index={0} colSpan={5}><Text strong>Total Project Cost</Text></Table.Summary.Cell>
                <Table.Summary.Cell index={5} align="right"><Text strong>{`Rp ${totalProjectCost.toLocaleString()}`}</Text></Table.Summary.Cell>
                <Table.Summary.Cell index={6} />
              </Table.Summary.Row>
            );
        }}
      />
      <AddEditBoQItemModal 
        visible={isModalVisible}
        onClose={handleModalClose}
        editingItem={editingItem}
        parentId={parentKey}
      />
      <AIAnalysisModal
        visible={isAnalysisModalVisible}
        onClose={() => setIsAnalysisModalVisible(false)}
      />
    </div>
  );
};

export default BoQGenerator;
