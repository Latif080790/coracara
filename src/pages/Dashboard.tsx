
import React from 'react';
import { Row, Col, Card, Statistic, Progress, Space } from 'antd';
import {
  CheckCircleOutlined,
  DollarCircleOutlined,
  FieldTimeOutlined,
  WarningOutlined,
} from '@ant-design/icons';

const Dashboard: React.FC = () => {
  return (
    <div>
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title="Project Status"
              value="On Track"
              prefix={<CheckCircleOutlined />}
              valueStyle={{ color: '#3f8600' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title="Budget vs. Actual"
              value={950000}
              precision={2}
              prefix={<DollarCircleOutlined />}
              suffix="/ 1,000,000"
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title="Schedule Adherence"
              value={98}
              prefix={<FieldTimeOutlined />}
              suffix="%"
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title="Risks Identified"
              value={12}
              prefix={<WarningOutlined />}
              valueStyle={{ color: '#cf1322' }}
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginTop: 24 }}>
        <Col xs={24} md={12}>
          <Card title="Progress Overview">
            <Space direction="vertical" style={{ width: '100%' }}>
              <span>Architectural</span>
              <Progress percent={90} />
              <span>Structural</span>
              <Progress percent={75} />
              <span>MEP</span>
              <Progress percent={60} status="exception" />
            </Space>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
