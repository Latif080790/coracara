
import React, { useState } from 'react';
import { Table, Button, Space, Typography, Popconfirm, InputNumber, Input } from 'antd';
import { PlusOutlined, DeleteOutlined, DownloadOutlined } from '@ant-design/icons';

const { Title } = Typography;

// Mock data for BoQ
const initialData = [
  {
    key: '1',
    item: 'A',
    description: 'Architectural Works',
    children: [
      {
        key: '1-1',
        item: 'A.1',
        description: 'Concrete Works',
        children: [
            {
                key: '1-1-1',
                item: 'A.1.1',
                description: 'Foundation Concrete',
                unit: 'm³',
                quantity: 120,
                rate: 1500000,
            }
        ]
      },
    ],
  },
  {
    key: '2',
    item: 'S',
    description: 'Structural Works',
  },
];

const BoQGenerator: React.FC = () => {
  const [data, setData] = useState(initialData);

  const columns = [
    {
      title: 'Item',
      dataIndex: 'item',
      key: 'item',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Unit',
      dataIndex: 'unit',
      key: 'unit',
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
      render: (text: number) => <InputNumber value={text} style={{ width: '100%' }}/>
    },
    {
        title: 'Rate',
        dataIndex: 'rate',
        key: 'rate',
        render: (text: number) => <InputNumber value={text} style={{ width: '100%' }} formatter={value => `Rp ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}/>
      },
    {
      title: 'Amount',
      key: 'amount',
      render: (_: any, record: any) => {
        const amount = (record.quantity || 0) * (record.rate || 0);
        return `Rp ${amount.toLocaleString()}`;
      },
    },
    {
        title: 'Action',
        key: 'action',
        render: () => (
          <Popconfirm title="Sure to delete?">
            <Button icon={<DeleteOutlined />} danger />
          </Popconfirm>
        ),
      },
  ];

  return (
    <div>
      <Title level={4}>Bill of Quantity (BoQ)</Title>
      <Space style={{ marginBottom: 16 }}>
        <Button type="primary" icon={<PlusOutlined />}>Add Item</Button>
        <Button icon={<DownloadOutlined />}>Export BoQ</Button>
      </Space>
      <Table
        columns={columns}
        dataSource={data}
        pagination={false}
        bordered
      />
    </div>
  );
};

export default BoQGenerator;
