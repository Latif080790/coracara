
import React from 'react';
import { Typography, Row, Col, Card, Button } from 'antd';
import { FilePdfOutlined, FileExcelOutlined, AreaChartOutlined } from '@ant-design/icons'; // Removed SettingOutlined

const { Title, Paragraph } = Typography;

const ReportingSuite: React.FC = () => {
  return (
    <div>
      <Title level={4}>Reporting Suite</Title>
      <Paragraph>
        Generate comprehensive and customizable reports from your project data. Export to multiple formats
        or view them in a dynamic dashboard.
      </Paragraph>
      
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} md={8}>
          <Card title="Cost Analysis Report">
            <Paragraph>Detailed breakdown of costs by division, item, and resource.</Paragraph>
            <Button type="primary" icon={<FilePdfOutlined />}>Export PDF</Button>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Card title="Schedule & Critical Path">
            <Paragraph>Visual Gantt chart and critical path analysis. Export as a project file.</Paragraph>
            <Button type="primary" icon={<FileExcelOutlined />}>Export XLS</Button>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Card title="Interactive Dashboard">
            <Paragraph>Open a dynamic and interactive dashboard to visualize project KPIs.</Paragraph>
            <Button type="primary" icon={<AreaChartOutlined />}>Open Dashboard</Button>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default ReportingSuite;
