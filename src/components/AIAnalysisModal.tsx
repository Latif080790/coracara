
import React from 'react';
import { Modal, Spin, Typography, Result, Button } from 'antd';
import useBoqStore from '../store/boqStore';

const { Title, Paragraph } = Typography;

interface AIAnalysisModalProps {
  visible: boolean;
  onClose: () => void;
}

const AIAnalysisModal: React.FC<AIAnalysisModalProps> = ({ visible, onClose }) => {
  const { analysis, loading, error } = useBoqStore(state => ({
    analysis: state.analysis,
    loading: state.loading,
    error: state.error,
  }));

  return (
    <Modal
      title="AI-Powered BoQ Analysis"
      visible={visible}
      onCancel={onClose}
      footer={[
        <Button key="back" onClick={onClose}>
          Close
        </Button>,
      ]}
      width={650}
    >
      {loading ? (
        <div style={{ textAlign: 'center', padding: '48px 0' }}>
          <Spin size="large" />
          <Paragraph style={{ marginTop: 16 }}>Our AI is analyzing your Bill of Quantities...</Paragraph>
        </div>
      ) : error ? (
        <Result
          status="error"
          title="Analysis Failed"
          subTitle={error}
        />
      ) : analysis ? (
        <div>
          <Title level={5}>Analysis Complete</Title>
          <Paragraph>{analysis.summary}</Paragraph>
          <Title level={5}>Recommendations</Title>
          <ul>
            {analysis.recommendations.map((rec, index) => (
              <li key={index}>{rec}</li>
            ))}
          </ul>
        </div>
      ) : (
        <Result title="No analysis data available. Please run the analysis first." />
      )}
    </Modal>
  );
};

export default AIAnalysisModal;
