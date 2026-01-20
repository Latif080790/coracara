
import React, { useState } from 'react';
import { Form, Input, Button, Card, Typography, message, Spin } from 'antd';
import { UserOutlined, LockOutlined, BuildingOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import useUserStore from '../store/userStore';

const { Title } = Typography;

const LoginPage: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const login = useUserStore((state) => state.login);

  const onFinish = async (values: any) => {
    setLoading(true);
    try {
      // We'll use the email as the name for simplicity for now
      await login(values.email, values.email.split('@')[0]);
      message.success('Login successful!');
      navigate('/');
    } catch (error) {
      message.error('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      background: 'linear-gradient(to right, #ece9e6, #ffffff)',
    }}>
      <Spin spinning={loading}>
        <Card style={{ width: 400, boxShadow: '0 8px 24px rgba(0,0,0,0.1)' }}>
            <div style={{ textAlign: 'center', marginBottom: '24px' }}>
                <BuildingOutlined style={{ fontSize: '48px', color: '#1890ff' }} />
                <Title level={2} style={{ marginTop: '16px' }}>AEstimator Pro</Title>
            </div>
          <Form
            name="login"
            initialValues={{ remember: true }}
            onFinish={onFinish}
          >
            <Form.Item
              name="email"
              rules={[{ required: true, message: 'Please input your Email!', type: 'email' }]}
            >
              <Input prefix={<UserOutlined />} placeholder="Email" size="large" />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[{ required: true, message: 'Please input your Password!' }]}
            >
              <Input.Password prefix={<LockOutlined />} placeholder="Password" size="large" />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" block size="large">
                Log In
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Spin>
    </div>
  );
};

export default LoginPage;
