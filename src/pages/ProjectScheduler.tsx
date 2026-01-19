
import React, { useState, useEffect } from 'react';
import { Table, Button, Space, Typography, Tag, Timeline, Popconfirm } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, CaretRightOutlined } from '@ant-design/icons';
import useSchedulerStore, { type Task } from '../store/schedulerStore'; // Correct import type
import AddEditTaskModal from '../components/AddEditTaskModal';

const { Title } = Typography;

const ProjectScheduler: React.FC = () => {
  const { tasks, calculateCriticalPath, removeTask } = useSchedulerStore(state => ({
    tasks: state.tasks,
    calculateCriticalPath: state.calculateCriticalPath,
    removeTask: state.removeTask,
  }));

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  useEffect(() => {
    calculateCriticalPath();
  }, [tasks.length, calculateCriticalPath]);

  const showAddTaskModal = () => {
    setEditingTask(null);
    setIsModalVisible(true);
  };

  const showEditTaskModal = (task: Task) => {
    setEditingTask(task);
    setIsModalVisible(true);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
    setEditingTask(null);
    calculateCriticalPath();
  };

  const handleDelete = (id: string) => {
    removeTask(id);
  };

  const columns = [
    { title: 'ID', dataIndex: 'id', key: 'id', width: 50 },
    { title: 'Task', dataIndex: 'name', key: 'name' },
    { title: 'Duration', dataIndex: 'duration', key: 'duration', align: 'center' as const, width: 100 },
    { title: 'Early Start', dataIndex: 'earlyStart', key: 'earlyStart', align: 'center' as const, width: 100 },
    { title: 'Early Finish', dataIndex: 'earlyFinish', key: 'earlyFinish', align: 'center' as const, width: 100 },
    { title: 'Late Start', dataIndex: 'lateStart', key: 'lateStart', align: 'center' as const, width: 100 },
    { title: 'Late Finish', dataIndex: 'lateFinish', key: 'lateFinish', align: 'center' as const, width: 100 },
    { title: 'Predecessors', dataIndex: 'predecessors', key: 'predecessors', render: (p: string[]) => p.join(', ') },
    {
      title: 'Status',
      dataIndex: 'isCritical',
      key: 'isCritical',
      align: 'center' as const,
      width: 120,
      render: (isCritical: boolean) => (
        <Tag color={isCritical ? 'red' : 'blue'}>{isCritical ? 'CRITICAL' : 'NON-CRITICAL'}</Tag>
      ),
    },
    {
        title: 'Actions',
        key: 'actions',
        align: 'center' as const,
        width: 120,
        render: (_: unknown, record: Task) => (
          <Space size="middle">
            <Button icon={<EditOutlined />} onClick={() => showEditTaskModal(record)}>Edit</Button>
            <Popconfirm
              title="Are you sure you want to delete this task?"
              onConfirm={() => handleDelete(record.id)}
              okText="Yes, Delete"
              cancelText="No"
            >
              <Button icon={<DeleteOutlined />} danger>Delete</Button>
            </Popconfirm>
          </Space>
        ),
      },
  ];

  return (
    <div>
      <style>{`.critical-task-row { background-color: #fff1f0; }`}</style>

      <Title level={4}>Project Schedule & Gantt Chart</Title>
      <Space style={{ marginBottom: 16 }}>
        <Button type="primary" icon={<PlusOutlined />} onClick={showAddTaskModal}>Add Task</Button>
        <Button icon={<CaretRightOutlined />} onClick={calculateCriticalPath}>Recalculate Critical Path</Button>
      </Space>

      <Table
        columns={columns}
        dataSource={tasks}
        rowKey="id"
        pagination={false}
        bordered
        scroll={{ x: 'max-content' }}
        title={() => 'Task List'}
        rowClassName={(record) => record.isCritical ? 'critical-task-row' : ''}
        onRow={(record) => ({
          onDoubleClick: () => showEditTaskModal(record),
        })}
      />

      <Title level={5} style={{ marginTop: 24 }}>Simplified Gantt View</Title>
      <div style={{ padding: '20px', background: '#f5f5f5' }}>
        <Timeline>
          {tasks.map(task => (
            <Timeline.Item key={task.id} color={task.isCritical ? 'red' : 'blue'}>
              {`${task.id}: ${task.name} (Duration: ${task.duration} days)`}
            </Timeline.Item>
          ))}
        </Timeline>
      </div>

      <AddEditTaskModal
        visible={isModalVisible}
        onClose={handleModalClose}
        editingTask={editingTask}
      />
    </div>
  );
};

export default ProjectScheduler;
