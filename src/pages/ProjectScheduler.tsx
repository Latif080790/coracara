
import React from 'react';
import { Table, Button, Space, Typography, Tag, Timeline } from 'antd';
import { PlusOutlined, LinkOutlined, CaretRightOutlined } from '@ant-design/icons';

const { Title } = Typography;

// Mock data for project schedule
const scheduleData = [
  {
    key: '1',
    id: 'T01',
    task: 'Foundation Works',
    duration: 10, // in days
    startDate: '2024-01-01',
    endDate: '2024-01-10',
    predecessor: '-',
    isCritical: true,
  },
  {
    key: '2',
    id: 'T02',
    task: 'Structural Framing',
    duration: 15,
    startDate: '2024-01-11',
    endDate: '2024-01-25',
    predecessor: 'T01',
    isCritical: true,
  },
  {
    key: '3',
    id: 'T03',
    task: 'Exterior Cladding',
    duration: 8,
    startDate: '2024-01-26',
    endDate: '2024-02-02',
    predecessor: 'T02',
    isCritical: false,
  },
  {
    key: '4',
    id: 'T04',
    task: 'MEP Installation',
    duration: 12,
    startDate: '2024-01-26',
    endDate: '2024-02-06',
    predecessor: 'T02',
    isCritical: true,
  },
];

const ProjectScheduler: React.FC = () => {
  const columns = [
    { title: 'ID', dataIndex: 'id', key: 'id' },
    { title: 'Task', dataIndex: 'task', key: 'task' },
    { title: 'Duration (Days)', dataIndex: 'duration', key: 'duration' },
    { title: 'Start Date', dataIndex: 'startDate', key: 'startDate' },
    { title: 'End Date', dataIndex: 'endDate', key: 'endDate' },
    { title: 'Predecessor', dataIndex: 'predecessor', key: 'predecessor' },
    {
      title: 'Status',
      dataIndex: 'isCritical',
      key: 'isCritical',
      render: (isCritical: boolean) => (
        <Tag color={isCritical ? 'red' : 'blue'}>{isCritical ? 'Critical' : 'Non-Critical'}</Tag>
      ),
    },
  ];

  return (
    <div>
      <Title level={4}>Project Schedule & Gantt Chart</Title>
      <Space style={{ marginBottom: 16 }}>
        <Button type="primary" icon={<PlusOutlined />}>Add Task</Button>
        <Button icon={<LinkOutlined />}>Add Dependency</Button>
        <Button icon={<CaretRightOutlined />}>Run Simulation</Button>
      </Space>
      <Table
        columns={columns}
        dataSource={scheduleData}
        pagination={false}
        bordered
        title={() => 'Task List'}
      />
      <Title level={5} style={{marginTop: 24}}>Simplified Gantt View</Title>
      <div style={{padding: '20px', background: '#f5f5f5'}}>
        <Timeline>
            <Timeline.Item color="red">T01: Foundation Works (10 days)</Timeline.Item>
            <Timeline.Item color="red">T02: Structural Framing (15 days)</Timeline.Item>
            <Timeline.Item color="blue">T03: Exterior Cladding (8 days)</Timeline.Item>
            <Timeline.Item color="red">T04: MEP Installation (12 days)</Timeline.Item>
        </Timeline>
      </div>
    </div>
  );
};

export default ProjectScheduler;
