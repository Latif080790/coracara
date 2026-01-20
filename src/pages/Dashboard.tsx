
import React, { useEffect, useMemo } from 'react';
import { Row, Col, Card, Statistic, Typography } from 'antd';
import {
  CheckCircleOutlined,
  DollarCircleOutlined,
  FieldTimeOutlined,
  WarningOutlined,
} from '@ant-design/icons';
import { Pie, Gantt, type GanttConfig } from '@ant-design/plots';
import useBoqStore from '../store/boqStore';
import useSchedulerStore from '../store/schedulerStore';

const { Title } = Typography;

const Dashboard: React.FC = () => {
  const boqItems = useBoqStore(state => state.items);
  const { tasks, calculateCriticalPath } = useSchedulerStore();

  useEffect(() => {
    calculateCriticalPath();
  }, [calculateCriticalPath]);

  const costDistributionData = useMemo(() => {
    const divisionCosts: { [key: string]: number } = {};
    boqItems.forEach(item => {
      const division = item.item.split('.')[0];
      if (division) {
        if (!divisionCosts[division]) {
          divisionCosts[division] = 0;
        }
        divisionCosts[division] += item.quantity * item.rate;
      }
    });
    return Object.entries(divisionCosts).map(([type, value]) => ({ type, value }));
  }, [boqItems]);

  const totalCost = useMemo(() => costDistributionData.reduce((acc, item) => acc + item.value, 0), [costDistributionData]);

  const pieConfig = {
    data: costDistributionData,
    angleField: 'value',
    colorField: 'type',
    radius: 0.8,
    label: {
      type: 'inner',
      offset: '-50%',
      content: ({ percent }: any) => `${(percent * 100).toFixed(0)}%`,
      style: { textAlign: 'center', fontSize: 14 },
    },
    interactions: [{ type: 'element-selected' }, { type: 'element-active' }],
    legend: { layout: 'horizontal' as const, position: 'bottom' as const },
  };

  const ganttData = useMemo(() => {
    return tasks
      .map(task => ({
        task: task.name,
        start: task.earlyStart || 0,
        end: task.earlyFinish || 0,
        isCritical: task.isCritical || false,
      }))
      .sort((a, b) => a.start - b.start);
  }, [tasks]);

  const ganttConfig: Omit<GanttConfig, 'data'> = {
    xField: ['start', 'end'],
    yField: 'task',
    tooltip: {
        formatter: (data: any) => ({
          name: data.task,
          value: `Day ${data.start} to Day ${data.end}`,
        }),
      },
    color: (datum: any) => (datum.isCritical ? '#f5222d' : '#1890ff'),
  };

  return (
    <div>
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} md={6}><Card><Statistic title="Project Status" value="On Track" prefix={<CheckCircleOutlined />} valueStyle={{ color: '#3f8600' }} /></Card></Col>
        <Col xs={24} sm={12} md={6}><Card><Statistic title="Total Estimated Cost" value={totalCost} precision={2} prefix={<DollarCircleOutlined />} /></Card></Col>
        <Col xs={24} sm={12} md={6}><Card><Statistic title="Schedule Adherence" value={98} prefix={<FieldTimeOutlined />} suffix="%" /></Card></Col>
        <Col xs={24} sm={12} md={6}><Card><Statistic title="Risks Identified" value={12} prefix={<WarningOutlined />} valueStyle={{ color: '#cf1322' }} /></Card></Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginTop: 24 }}>
        <Col xs={24} lg={10}>
          <Card>
            <Title level={5}>Cost Distribution by Division</Title>
            <Pie {...pieConfig} />
          </Card>
        </Col>
        <Col xs={24} lg={14}>
          <Card>
            <Title level={5}>Project Schedule Overview</Title>
            <Gantt data={ganttData} {...ganttConfig} />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
