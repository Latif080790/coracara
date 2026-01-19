
import React from 'react';
import { Table, Typography, Card, Row, Col, Statistic, Input } from 'antd'; // Removed InputNumber
import { LineChartOutlined } from '@ant-design/icons'; // Removed DollarCircleOutlined

const { Title } = Typography;
const { Search } = Input;

// Mock data for rate analysis
const data = [
  {
    key: '1',
    resource: 'Cement (Portland)',
    unit: 'bag',
    aestimator_rate: 68000,
    market_rate_1: 70000,
    market_rate_2: 67500,
  },
  {
    key: '2',
    resource: 'Reinforcement Steel',
    unit: 'kg',
    aestimator_rate: 15500,
    market_rate_1: 16000,
    market_rate_2: 15200,
  },
  // ... more data
];

const columns = [
  { title: 'Resource', dataIndex: 'resource', key: 'resource' },
  { title: 'Unit', dataIndex: 'unit', key: 'unit' },
  {
    title: 'AEstimator Rate (Rp)',
    dataIndex: 'aestimator_rate',
    key: 'aestimator_rate',
    render: (rate: number) => rate.toLocaleString(),
  },
  {
    title: 'Supplier A Rate (Rp)',
    dataIndex: 'market_rate_1',
    key: 'market_rate_1',
    render: (rate: number) => rate.toLocaleString(),
  },
  {
    title: 'Supplier B Rate (Rp)',
    dataIndex: 'market_rate_2',
    key: 'market_rate_2',
    render: (rate: number) => rate.toLocaleString(),
  },
];

const RateAnalysis: React.FC = () => {
  return (
    <div>
        <Title level={4}>Market Rate Analysis</Title>
        <Row gutter={16} style={{ marginBottom: 24}}>
            <Col span={8}>
                <Card>
                    <Statistic title="Inflation Adjustment" value={2.5} suffix="%" prefix={<LineChartOutlined />} />
                </Card>
            </Col>
            {/* Other stats can go here */}
        </Row>
        <Search placeholder="Search for a resource..." style={{marginBottom: 16, width: 300}} />
        <Table columns={columns} dataSource={data} pagination={false} bordered />
    </div>
  );
};

export default RateAnalysis;
