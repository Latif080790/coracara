
import React, { useState } from 'react';
import { Row, Col, Card, Table, Slider, Statistic, Typography, InputNumber } from 'antd';
import { LineChartOutlined, DollarCircleOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

// Mock data for rate components
const rateCompositionData = [
  { key: '1', component: 'Labor', cost: 350000, percentage: 23.33 },
  { key: '2', component: 'Material', cost: 850000, percentage: 56.67 },
  { key: '3', component: 'Equipment', cost: 200000, percentage: 13.33 },
  { key: '4', component: 'Overhead', cost: 100000, percentage: 6.67 },
];

const RateAnalysis: React.FC = () => {
  const [profitMargin, setProfitMargin] = useState(15);

  const columns = [
    { title: 'Component', dataIndex: 'component', key: 'component' },
    { title: 'Cost', dataIndex: 'cost', key: 'cost', render: (cost: number) => `Rp ${cost.toLocaleString()}` },
    { title: 'Percentage', dataIndex: 'percentage', key: 'percentage', render: (perc: number) => `${perc}%` },
  ];

  const subtotal = rateCompositionData.reduce((acc, item) => acc + item.cost, 0);
  const profit = subtotal * (profitMargin / 100);
  const finalRate = subtotal + profit;

  return (
    <div>
      <Title level={4}>Rate Analysis for Item: A.1.1 - Foundation Concrete</Title>
      <Row gutter={[16, 16]}>
        <Col xs={24} md={12}>
          <Card title="Rate Composition (per m³)">
            <Table
              columns={columns}
              dataSource={rateCompositionData}
              pagination={false}
              summary={() => (
                <Table.Summary.Row>
                  <Table.Summary.Cell index={0}><Text strong>Subtotal</Text></Table.Summary.Cell>
                  <Table.Summary.Cell index={1}><Text strong>Rp {subtotal.toLocaleString()}</Text></Table.Summary.Cell>
                  <Table.Summary.Cell index={2}></Table.Summary.Cell>
                </Table.Summary.Row>
              )}
            />
          </Card>
        </Col>
        <Col xs={24} md={12}>
            <Row gutter={[16, 16]}>
                <Col span={24}>
                    <Card title="Market & Historical Benchmark">
                         <LineChartOutlined style={{ fontSize: 96, color: '#ccc', display: 'block', textAlign: 'center', width: '100%' }}/>
                         <Text type="secondary" style={{display: 'block', textAlign: 'center'}}>S-Curve analysis and benchmark chart placeholder.</Text>
                    </Card>
                </Col>
                <Col span={24}>
                    <Card title="Final Rate Calculation">
                        <Statistic title="Subtotal" value={subtotal} prefix="Rp" />
                        <div style={{margin: '16px 0'}}>
                            <Text>Profit Margin ({profitMargin}%)</Text>
                            <Slider
                                min={0}
                                max={50}
                                onChange={setProfitMargin}
                                value={profitMargin}
                            />
                        </div>
                        <Statistic title="Final Proposed Rate" value={finalRate} precision={2} prefix="Rp" valueStyle={{color: '#3f8600'}}/>
                    </Card>
                </Col>
            </Row>
        </Col>
      </Row>
    </div>
  );
};

export default RateAnalysis;
