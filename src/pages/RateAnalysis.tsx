
import React, { useMemo, useState } from 'react';
import { Typography, Card, Row, Col, Statistic, Input } from 'antd';
import { LineChartOutlined } from '@ant-design/icons';
import { Column } from '@ant-design/plots';

const { Title } = Typography;
const { Search } = Input;

// Mock data for rate analysis
const sourceData = [
  {
    key: '1',
    resource: 'Cement (Portland)',
    unit: 'bag',
    'AEstimator Rate': 68000,
    'Supplier A': 70000,
    'Supplier B': 67500,
  },
  {
    key: '2',
    resource: 'Reinforcement Steel',
    unit: 'kg',
    'AEstimator Rate': 15500,
    'Supplier A': 16000,
    'Supplier B': 15200,
  },
  {
    key: '3',
    resource: 'Sand',
    unit: 'm³',
    'AEstimator Rate': 250000,
    'Supplier A': 255000,
    'Supplier B': 248000,
  },
  {
    key: '4',
    resource: 'Gravel',
    unit: 'm³',
    'AEstimator Rate': 280000,
    'Supplier A': 290000,
    'Supplier B': 275000,
  },
];

const RateAnalysis: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const transformedData = useMemo(() => {
    const data = sourceData
      .filter(d => d.resource.toLowerCase().includes(searchTerm.toLowerCase()))
      .flatMap(d => [
        { resource: d.resource, rate: d['AEstimator Rate'], source: 'AEstimator Rate' },
        { resource: d.resource, rate: d['Supplier A'], source: 'Supplier A' },
        { resource: d.resource, rate: d['Supplier B'], source: 'Supplier B' },
      ]);
    return data;
  }, [searchTerm]);

  const chartConfig = {
    data: transformedData,
    xField: 'resource',
    yField: 'rate',
    groupField: 'source',
    isGroup: true as const,
    height: 400,
    yAxis: {
        title: { text: 'Rate (Rp)' },
        label: {
            formatter: (v: string) => new Intl.NumberFormat('id-ID').format(Number(v)),
        },
    },
    tooltip: {
        formatter: (datum: any) => ({ name: datum.source, value: `Rp ${new Intl.NumberFormat('id-ID').format(datum.rate)}` }),
    },
  };

  return (
    <div>
        <Title level={4}>Market Rate Analysis</Title>
        <Row gutter={16} style={{ marginBottom: 24}}>
            <Col span={8}>
                <Card>
                    <Statistic title="Inflation Adjustment" value={2.5} suffix="%" prefix={<LineChartOutlined />} />
                </Card>
            </Col>
        </Row>
        <Card>
            <Search 
                placeholder="Search for a resource..." 
                onChange={(e) => setSearchTerm(e.target.value)} 
                style={{marginBottom: 16, width: 300}}
            />
            <Column {...chartConfig} />
        </Card>
    </div>
  );
};

export default RateAnalysis;
