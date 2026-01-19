
import React from 'react';
import { Modal, Form, Input, InputNumber } from 'antd'; // Removed TreeSelect
import useBoqStore, { BoQItem } from '../store/boqStore';

interface AddEditBoQItemModalProps {
  visible: boolean;
  onClose: () => void;
  editingItem: BoQItem | null;
  parentId?: string | null; // Untuk menambahkan item anak
}

const AddEditBoQItemModal: React.FC<AddEditBoQItemModalProps> = ({ visible, onClose, editingItem, parentId }) => {
  const [form] = Form.useForm();
  const { addItem, updateItem } = useBoqStore();

  React.useEffect(() => {
    if (editingItem) {
      form.setFieldsValue(editingItem);
    } else {
      form.resetFields();
      if (parentId) {
        form.setFieldsValue({ parentId }); // This field doesn't exist in the form, but leaving as it was.
      }
    }
  }, [editingItem, parentId, form, visible]);

  const handleOk = () => {
    form.validateFields().then(values => {
      const itemData = { ...values };
      if (editingItem) {
        updateItem(editingItem.key, itemData);
      } else {
        // The `addItem` function expects Omit<BoQItem, 'key'>
        // The form values should align with this type.
        addItem(itemData as Omit<BoQItem, 'key'>, parentId);
      }
      onClose();
    });
  };

  // Removed the unused treeData variable

  return (
    <Modal
      title={editingItem ? 'Edit BoQ Item' : 'Add BoQ Item'}
      visible={visible}
      onOk={handleOk}
      onCancel={onClose}
      destroyOnClose
    >
      <Form form={form} layout="vertical" name="boqItemForm">
        <Form.Item name="item" label="Item Code" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="description" label="Description" rules={[{ required: true }]}>
          <Input.TextArea rows={2} />
        </Form.Item>
        <Form.Item name="unit" label="Unit" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="quantity" label="Quantity" rules={[{ required: true, type: 'number' }]}>
          <InputNumber min={0} style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item name="rate" label="Rate" rules={[{ required: true, type: 'number' }]}>
          <InputNumber min={0} style={{ width: '100%' }} formatter={value => `Rp ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')} parser={value => value!.replace(/Rp\s?|(,*)/g, '')} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddEditBoQItemModal;
