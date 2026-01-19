
import React from 'react';
import { Table, Tag, Typography, Progress, Card, Row, Col } from 'antd';
// Removed unused icons

const { Title } = Typography;

// Mock data for risk analysis
const riskData = [
  {
    key: '1',
    risk_id: 'R-001',
    description: 'Material price fluctuation',
    category: 'Financial',
    impact: 'High',
    likelihood: 'Medium',
    mitigation_status: 'Planned',
  },
  {
    key: '2',
    risk_id: 'R-002',
    description: 'Unexpected subsurface soil conditions',
    category: 'Technical',
    impact: 'High',
    likelihood: 'Low',
    mitigation_status: 'Mitigated',
  },
  {
    key: '3',
    risk_id: 'R-003',
    description: 'Skilled labor shortage',
    category: 'Resource',
    impact: 'Medium',
    likelihood: 'High',
    mitigation_status: 'In Progress',
  },
];

const RiskManager: React.FC = () => {
    const columns = [
        { title: 'ID', dataIndex: 'risk_id', key: 'risk_id' },
        { title: 'Description', dataIndex: 'description', key: 'description' },
        { title: 'Category', dataIndex: 'category', key: 'category' },
        {
          title: 'Impact',
          dataIndex: 'impact',
          key: 'impact',
          render: (impact: string) => (
            <Tag color={impact === 'High' ? 'red' : impact === 'Medium' ? 'orange' : 'green'}>
              {impact.toUpperCase()}
            </Tag>
          ),
        },
        {
            title: 'Likelihood',
            dataIndex: 'likelihood',
            key: 'likelihood',
            render: (likelihood: string) => (
              <Tag color={likelihood === 'High' ? 'red' : likelihood === 'Medium' ? 'orange' : 'green'}>
                {likelihood.toUpperCase()}
              </Tag>
            ),
        },
        { 
            title: 'Mitigation Status', 
            dataIndex: 'mitigation_status', 
            key: 'mitigation_status'
        },
    ];

  return (
    <div>
        <Title level={4}>Project Risk Management</Title>
        <Row gutter={16} style={{ marginBottom: 24}}>
            <Col span={12}>
                <Card title="Overall Risk Exposure">
                    <Progress type="dashboard" percent={65} format={percent => `${percent} (High)`} />
                </Card>
            </Col>
            <Col span={12}>
                <Card title="Mitigation Progress">
                    <Progress percent={40} status="active" />
                    <p>4 out of 10 identified risks have active mitigation plans.</p>
                </Card>
            </Col>
        </Row>
        <Table
            columns={columns}
            dataSource={riskData}
            pagination={false}
            bordered
            title={() => 'Risk Register'}
        />
    </div>
  );
};

export default RiskManager;
