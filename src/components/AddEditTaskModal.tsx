
import React from 'react';
import { Modal, Form, Input, InputNumber, Select } from 'antd';
import useSchedulerStore, { Task } from '../store/schedulerStore';

interface AddEditTaskModalProps {
  visible: boolean;
  onClose: () => void;
  editingTask: Task | null; // Null jika menambah, Task jika mengedit
}

const AddEditTaskModal: React.FC<AddEditTaskModalProps> = ({ visible, onClose, editingTask }) => {
  const [form] = Form.useForm();
  const { addTask, updateTask, tasks } = useSchedulerStore();

  // Atur nilai formulir saat modal terbuka untuk mengedit
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
        // Perbarui tugas yang ada tanpa mengubah ID-nya
        updateTask(editingTask.id, values as Partial<Omit<Task, 'id'>>);
      } else {
        // Tambahkan tugas baru
        addTask(values.name, values.duration, values.predecessors || []);
      }
      onClose(); // Tutup modal setelah berhasil
    });
  };

  return (
    <Modal
      title={editingTask ? 'Edit Task' : 'Add New Task'}
      visible={visible}
      onOk={handleOk}
      onCancel={onClose}
      okText={editingTask ? 'Save Changes' : 'Add Task'}
      destroyOnClose // Hancurkan konten modal saat ditutup untuk mereset state
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
            // Filter tugas saat ini dari daftar pilihan untuk menghindari dependensi sirkular
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
