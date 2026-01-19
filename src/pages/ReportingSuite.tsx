
import React from 'react';
import { Card, Row, Col, List, Button, Select, DatePicker, Typography } from 'antd';
import { FilePdfOutlined, FileExcelOutlined, SettingOutlined } from '@ant-design/icons';

const { Title } = Typography;
const { Option } = Select;
const { RangePicker } = DatePicker;

const availableReports = [
  {
    title: 'Cost Estimate Summary',
    description: 'High-level summary of project costs, including total budget, actuals, and variance.',
  },
  {
    title: 'Detailed Bill of Quantities (BoQ)',
    description: 'Complete breakdown of all items, quantities, rates, and amounts.',
  },
  {
    title: 'Project Schedule Report',
    description: 'Gantt chart view with critical path, milestones, and task dependencies.',
  },
  {
    title: 'Risk Register & Analysis',
    description: 'A full log of identified risks, their scores, and mitigation status.',
  },
];

const ReportingSuite: React.FC = () => {
  return (
    <div>
      <Title level={4}>Comprehensive Reporting Suite</Title>
      <Row gutter={[16, 16]}>
        <Col xs={24} md={10}>
          <Card title="Report Library">
            <List
              itemLayout="horizontal"
              dataSource={availableReports}
              renderItem={item => (
                <List.Item
                  actions={[<Button type="primary">Generate</Button>]}
                >
                  <List.Item.Meta
                    title={item.title}
                    description={item.description}
                  />
                </List.Item>
              )}
            />
          </Card>
        </Col>
        <Col xs={24} md={14}>
            <Card title="Customize & Export">
                <Title level={5}>1. Select Report Options</Title>
                <Select placeholder="Select level of detail" style={{width: '100%', marginBottom: 16}}>
                    <Option value="summary">Summary</Option>
                    <Option value="detailed">Detailed</Option>
                </Select>
                <RangePicker style={{width: '100%', marginBottom: 16}}/>
                
                <Title level={5} style={{marginTop: 24}}>2. Preview</Title>
                <div style={{height: 200, background: '#f5f5f5', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
                    <FilePdfOutlined style={{fontSize: 64, color: '#ccc'}}/>
                    <p>Report preview will appear here.</p>
                </div>

                <Title level={5} style={{marginTop: 24}}>3. Export</Title>
                <Button icon={<FilePdfOutlined />} style={{marginRight: 8}}>Export as PDF</Button>
                <Button icon={<FileExcelOutlined />}>Export as Excel</Button>
            </Card>
        </Col>
      </Row>
    </div>
  );
};

export default ReportingSuite;
