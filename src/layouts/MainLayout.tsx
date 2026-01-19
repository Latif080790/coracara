
import React, { useState } from 'react';
import { Layout, Menu, Typography, Avatar, Space } from 'antd';
import {
  AppstoreOutlined,
  BuildOutlined,
  CalculatorOutlined,
  CloudUploadOutlined,
  DashboardOutlined,
  FileDoneOutlined,
  FileSyncOutlined,
  ScheduleOutlined,
  TeamOutlined,
  ToolOutlined,
} from '@ant-design/icons';
import { Link, Outlet } from 'react-router-dom';

const { Header, Content, Sider } = Layout;
const { Title } = Typography;

const menuItems = [
    { key: '1', icon: <DashboardOutlined />, label: 'Dashboard', path: '/' },
    { key: '2', icon: <CloudUploadOutlined />, label: 'Drawing Analyzer', path: '/drawing-analyzer' },
    { key: '3', icon: <FileDoneOutlined />, label: 'BoQ Generator', path: '/boq-generator' },
    { key: '4', icon: <CalculatorOutlined />, label: 'Quantity Surveyor', path: '/quantity-surveyor' },
    { key: '5', icon: <FileSyncOutlined />, label: 'Rate Analysis', path: '/rate-analysis' },
    { key: '6', icon: <ScheduleOutlined />, label: 'Project Scheduler', path: '/project-scheduler' },
    { key: '7', icon: <ToolOutlined />, label: 'Risk Manager', path: '/risk-manager' },
    { key: '8', icon: <AppstoreOutlined />, label: 'Reporting Suite', path: '/reporting-suite' },
];

const MainLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div style={{ height: '32px', margin: '16px', textAlign: 'center' }}>
            <BuildOutlined style={{ fontSize: '32px', color: '#fff' }}/>
        </div>
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
          {menuItems.map(item => (
            <Menu.Item key={item.key} icon={item.icon}>
              <Link to={item.path}>{item.label}</Link>
            </Menu.Item>
          ))}
        </Menu>
      </Sider>
      <Layout>
        <Header style={{ padding: '0 16px', background: '#fff', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Title level={3} style={{ margin: 0 }}>AEC Digital Twin</Title>
            <Space>
                <Avatar size="large" icon={<TeamOutlined />} />
            </Space>
        </Header>
        <Content style={{ margin: '24px 16px 0' }}>
          <div style={{ padding: 24, minHeight: 'calc(100vh - 112px)', background: '#fff' }}>
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
