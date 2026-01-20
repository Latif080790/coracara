
import React, { useState, useEffect } from 'react';
import { Layout, Menu, Typography, Avatar, Space, Button, notification, Tooltip } from 'antd';
import {
  AppstoreOutlined,
  BuildOutlined,
  CalculatorOutlined,
  CloudUploadOutlined,
  DashboardOutlined,
  FileDoneOutlined,
  FileSyncOutlined,
  ScheduleOutlined,
  UserAddOutlined, // Changed from TeamOutlined
  ToolOutlined,
} from '@ant-design/icons';
import { Link, Outlet, useLocation } from 'react-router-dom';
import useUserStore from '../store/userStore';
import useBoqStore from '../store/boqStore';

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

// Mock users to add
const newUsers = [
    { name: 'Bruce Banner', initials: 'BB', avatarUrl: 'https://i.pravatar.cc/150?u=a042581f4e29026707d' },
    { name: 'Peter Parker', initials: 'PP', avatarUrl: 'https://i.pravatar.cc/150?u=a042581f4e29026708d' },
];

const MainLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { collaborators, addCollaborator } = useUserStore();
  const { items, updateItem } = useBoqStore();
  const location = useLocation();

  const handleAddCollaborator = () => {
    if (newUsers.length > 0) {
        const userToAdd = newUsers.shift()!;
        addCollaborator(userToAdd);
        notification.success({
            message: `${userToAdd.name} has been added to the project.`,
            placement: 'bottomRight',
        });
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
        if (items.length > 0) {
            // Flatten the BoQ to easily pick a random item
            const flatItems = items.flatMap(item => item.children ? [item, ...item.children] : [item]);
            const randomItem = flatItems[Math.floor(Math.random() * flatItems.length)];
            const randomCollaborator = collaborators[Math.floor(Math.random() * collaborators.length)];
            
            // Simulate a rate change
            const newRate = randomItem.rate * (1 + (Math.random() - 0.5) * 0.1); // +/- 5%
            updateItem(randomItem.key, { rate: Math.round(newRate) });

            notification.info({
                message: 'Real-time Update',
                description: `${randomCollaborator.name} updated the rate for "${randomItem.description}".`,
                placement: 'bottomRight',
            });
        }
    }, 20000); // every 20 seconds

    return () => clearInterval(interval);
  }, [items, collaborators, updateItem]);

  const activeKey = menuItems.find(item => item.path === location.pathname)?.key || '1';

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div style={{ height: '32px', margin: '16px', textAlign: 'center', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <BuildOutlined style={{ fontSize: '32px', color: '#fff' }}/>
            {!collapsed && <Title level={4} style={{ color: 'white', marginLeft: '8px', marginBottom: 0 }}>AEstimator</Title>}
        </div>
        <Menu theme="dark" selectedKeys={[activeKey]} mode="inline">
          {menuItems.map(item => (
            <Menu.Item key={item.key} icon={item.icon}>
              <Link to={item.path}>{item.label}</Link>
            </Menu.Item>
          ))}
        </Menu>
      </Sider>
      <Layout>
        <Header style={{ padding: '0 24px', background: '#fff', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #f0f0f0' }}>
            <Title level={4} style={{ margin: 0 }}>Project Dashboard</Title>
            <Space align="center">
                <Avatar.Group maxCount={4}>
                    {collaborators.map(user => (
                        <Tooltip key={user.initials} title={user.name}>
                            <Avatar src={user.avatarUrl}>{user.initials}</Avatar>
                        </Tooltip>
                    ))}
                </Avatar.Group>
                <Button icon={<UserAddOutlined />} onClick={handleAddCollaborator}>Share</Button>
            </Space>
        </Header>
        <Content style={{ margin: '24px 16px 0' }}>
          <div style={{ padding: 24, minHeight: 'calc(100vh - 112px)', background: '#f5f5f5' }}>
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
