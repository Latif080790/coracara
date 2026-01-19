
import React from 'react';
import { Layout, Card, Tooltip, Button, Space, Tree, Typography } from 'antd';
import {
  ZoomInOutlined,
  ZoomOutOutlined,
  BorderOutlined,
  HighlightOutlined,
  CommentOutlined,
  EyeOutlined,
  EyeInvisibleOutlined,
  ApartmentOutlined,
} from '@ant-design/icons';

const { Content, Sider } = Layout;
const { Title, Text } = Typography;

// Mock data for layers
const treeData = [
  {
    title: 'Architectural',
    key: '0-0',
    icon: <EyeOutlined />,
    children: [
      { title: 'A-WALLS', key: '0-0-0', icon: <EyeOutlined /> },
      { title: 'A-DOORS', key: '0-0-1', icon: <EyeOutlined /> },
      { title: 'A-WINDOWS', key: '0-0-2', icon: <EyeInvisibleOutlined /> },
    ],
  },
  {
    title: 'Structural',
    key: '0-1',
    icon: <EyeOutlined />,
    children: [
        { title: 'S-BEAMS', key: '0-1-0', icon: <EyeOutlined /> },
        { title: 'S-COLS', key: '0-1-1', icon: <EyeOutlined /> },
    ],
  },
];

const DrawingAnalyzer: React.FC = () => {
  return (
    <Layout style={{ background: '#fff' }}>
      <Content style={{ position: 'relative', padding: '0 16px' }}>
        <Space style={{ marginBottom: 16 }}>
          <Tooltip title="Zoom In">
            <Button icon={<ZoomInOutlined />} />
          </Tooltip>
          <Tooltip title="Zoom Out">
            <Button icon={<ZoomOutOutlined />} />
          </Tooltip>
          <Tooltip title="Measure">
            <Button icon={<BorderOutlined />} />
          </Tooltip>
          <Tooltip title="Markup">
            <Button icon={<HighlightOutlined />} />
          </Tooltip>
          <Tooltip title="Comment">
            <Button icon={<CommentOutlined />} />
          </Tooltip>
        </Space>
        <Card title="Drawing View - A-01_Floor_Plan.dwg">
            <div style={{ 
                height: '60vh', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                background: '#f0f2f5' 
            }}>
                <ApartmentOutlined style={{ fontSize: 128, color: '#ccc' }}/>
            </div>
        </Card>
      </Content>
      <Sider width={300} style={{ background: '#fff', paddingLeft: '16px' }}>
        <Card title="AI Analysis & Layers">
            <Title level={5}>Layers</Title>
            <Tree
                showIcon
                defaultExpandAll
                treeData={treeData}
            />
            <Title level={5} style={{marginTop: 24}}>Object Properties</Title>
            <Text>Select an object to see its properties.</Text>
        </Card>
      </Sider>
    </Layout>
  );
};

export default DrawingAnalyzer;
