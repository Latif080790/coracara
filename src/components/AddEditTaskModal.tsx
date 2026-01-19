
import React from 'react';
import { Modal, Form, Input, InputNumber, Select } from 'antd';
import useSchedulerStore, { type Task } from '../store/schedulerStore'; // Correct import type

interface AddEditTaskModalProps {
  visible: boolean;
  onClose: () => void;
  editingTask: Task | null;
}

const AddEditTaskModal: React.FC<AddEditTaskModalProps> = ({ visible, onClose, editingTask }) => {
  const [form] = Form.useForm();
  const { addTask, updateTask, tasks } = useSchedulerStore();

  React.useEffect(() => {
    if (editingTask) {
      form.setFieldsValue(editingTask);
    } else {
      form.resetFields();
    }
  }, [editingTask, form, visible]);

  const handleOk = () => {
    form.validateFields().then(values => {
      if (editingTask) {
        updateTask(editingTask.id, values as Partial<Omit<Task, 'id'>>);
      } else {
        addTask(values.name, values.duration, values.predecessors || []);
      }
      onClose();
    });
  };

  return (
    <Modal
      title={editingTask ? 'Edit Task' : 'Add New Task'}
      visible={visible}
      onOk={handleOk}
      onCancel={onClose}
      okText={editingTask ? 'Save Changes' : 'Add Task'}
      destroyOnClose
    >
      <Form form={form} layout="vertical" name="taskForm">
        <Form.Item
          name="name"
          label="Task Name"
          rules={[{ required: true, message: 'Please enter the task name' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="duration"
          label="Duration (Days)"
          rules={[{ required: true, message: 'Please enter the duration' }]}
        >
          <InputNumber min={0} style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item
          name="predecessors"
          label="Predecessors (Dependencies)"
        >
          <Select
            mode="multiple"
            allowClear
            style={{ width: '100%' }}
            placeholder="Select predecessor tasks"
            options={tasks
              .filter(task => task.id !== editingTask?.id)
              .map(task => ({ label: `${task.id}: ${task.name}`, value: task.id }))}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddEditTaskModal;
