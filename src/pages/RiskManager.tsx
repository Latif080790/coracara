
import React from 'react';
import { Table, Tag, Typography, Card, Row, Col, Progress } from 'antd';
import { WarningOutlined, ThunderboltOutlined, CheckCircleOutlined } from '@ant-design/icons';

const { Title } = Typography;

// Mock data for risk register
const riskData = [
  {
    key: '1',
    riskId: 'R001',
    description: 'Unexpected site conditions',
    probability: 'High',
    impact: 'Medium',
    score: 15,
    mitigation: 'Geotechnical survey planned',
    status: 'Pending',
  },
  {
    key: '2',
    riskId: 'R002',
    description: 'Material price escalation',
    probability: 'Medium',
    impact: 'High',
    score: 20,
    mitigation: 'Bulk purchase agreement in progress',
    status: 'In Progress',
  },
  {
    key: '3',
    riskId: 'R003',
    description: 'Labor shortage',
    probability: 'Low',
    impact: 'High',
    score: 10,
    mitigation: 'Sub-contractor agreements signed',
    status: 'Mitigated',
  },
];

const RiskManager: React.FC = () => {
  const columns = [
    { title: 'ID', dataIndex: 'riskId', key: 'riskId' },
    { title: 'Description', dataIndex: 'description', key: 'description', width: '30%' },
    {
      title: 'Probability',
      dataIndex: 'probability',
      key: 'probability',
      render: (prob: string) => {
        let color = 'green';
        if (prob === 'Medium') color = 'orange';
        if (prob === 'High') color = 'red';
        return <Tag color={color}>{prob.toUpperCase()}</Tag>;
      },
    },
    {
        title: 'Impact',
        dataIndex: 'impact',
        key: 'impact',
        render: (imp: string) => {
          let color = 'green';
          if (imp === 'Medium') color = 'orange';
          if (imp === 'High') color = 'red';
          return <Tag color={color}>{imp.toUpperCase()}</Tag>;
        },
      },
    { title: 'Score', dataIndex: 'score', key: 'score', sorter: (a, b) => a.score - b.score },
    { title: 'Mitigation Plan', dataIndex: 'mitigation', key: 'mitigation', width: '30%' },
    {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
        render: (status: string) => {
          let color = 'default';
          if (status === 'In Progress') color = 'processing';
          if (status === 'Mitigated') color = 'success';
          return <Tag color={color}>{status}</Tag>;
        },
      },
  ];

  return (
    <div>
        <Title level={4}>Predictive Risk Manager</Title>
        <Row gutter={16} style={{ marginBottom: 24}}>
            <Col span={8}>
                <Card>
                    <p>Risk Heatmap (Probability vs. Impact)</p>
                    <div style={{height: 150, background: '#f5f5f5', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                        <ThunderboltOutlined style={{fontSize: 48, color: '#ccc'}}/>
                    </div>
                </Card>
            </Col>
            <Col span={16}>
                <Card title="Mitigation Progress">
                    <Row>
                        <Col span={12}><Progress type="circle" percent={33} format={() => 'Mitigated'} strokeColor={{ '0%': '#108ee9', '100%': '#87d068' }} /></Col>
                        <Col span={12}><Progress type="circle" percent={66} format={() => 'In Progress'} status="exception"/></Col>
                    </Row>
                </Card>
            </Col>
        </Row>
      <Table
        columns={columns}
        dataSource={riskData}
        pagination={false}
        bordered
        title={() => 'Project Risk Register'}
      />
    </div>
  );
};

export default RiskManager;
