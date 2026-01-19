
import React from 'react';
import { Table, Tag, Typography, Card, Row, Col, Statistic } from 'antd';
import { CheckCircleOutlined, IssuesCloseOutlined, BarChartOutlined } from '@ant-design/icons';

const { Title } = Typography;

// Define an interface for the data structure
interface ComparisonItem {
  key: string;
  item: string;
  description: string;
  unit: string;
  ai_quantity: number;
  manual_quantity: number;
  historical_avg: number;
}

// Mock data for quantity comparison with the new interface
const comparisonData: ComparisonItem[] = [
  {
    key: '1',
    item: 'A.1.1',
    description: 'Foundation Concrete',
    unit: 'm³',
    ai_quantity: 120,
    manual_quantity: 122,
    historical_avg: 118,
  },
  {
    key: '2',
    item: 'A.1.2',
    description: 'Slab on Grade',
    unit: 'm³',
    ai_quantity: 250,
    manual_quantity: 260,
    historical_avg: 245,
  },
  {
    key: '3',
    item: 'S.2.1',
    description: 'Steel Beams',
    unit: 'ton',
    ai_quantity: 45,
    manual_quantity: 42,
    historical_avg: 43,
  },
];

const QuantitySurveyor: React.FC = () => {
  const columns = [
    { title: 'Item', dataIndex: 'item', key: 'item' },
    { title: 'Description', dataIndex: 'description', key: 'description' },
    { title: 'Unit', dataIndex: 'unit', key: 'unit' },
    { title: 'AI Quantity', dataIndex: 'ai_quantity', key: 'ai_quantity' },
    { title: 'Manual Take-off', dataIndex: 'manual_quantity', key: 'manual_quantity' },
    { title: 'Historical Avg.', dataIndex: 'historical_avg', key: 'historical_avg' },
    {
      title: 'Variance',
      key: 'variance',
      render: (_: unknown, record: ComparisonItem) => { // Use the specific type
        const variance = ((record.ai_quantity - record.manual_quantity) / record.manual_quantity) * 100;
        const color = Math.abs(variance) > 5 ? 'volcano' : 'green';
        return <Tag color={color}>{variance.toFixed(2)}%</Tag>;
      },
    },
  ];

  return (
    <div>
        <Title level={4}>Quantity Validation</Title>
        <Row gutter={16} style={{ marginBottom: 24}}>
            <Col span={8}>
                <Card>
                    <Statistic title="Items Validated" value={250} prefix={<CheckCircleOutlined />} />
                </Card>
            </Col>
            <Col span={8}>
                <Card>
                    <Statistic title="Outliers Detected" value={5} prefix={<IssuesCloseOutlined />} valueStyle={{color: '#cf1322'}} />
                </Card>
            </Col>
            <Col span={8}>
                <Card>
                    <Statistic title="Probability Range (P50)" value={119.5} suffix="m³" prefix={<BarChartOutlined />} />
                </Card>
            </Col>
        </Row>
      <Table
        columns={columns}
        dataSource={comparisonData}
        pagination={false}
        bordered
        title={() => 'Quantity Cross-Validation'}
      />
    </div>
  );
};

export default QuantitySurveyor;
