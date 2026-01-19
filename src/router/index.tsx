
import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import Dashboard from '../pages/Dashboard';
import DrawingAnalyzer from '../pages/DrawingAnalyzer';
import BoQGenerator from '../pages/BoQGenerator';
import QuantitySurveyor from '../pages/QuantitySurveyor';
import RateAnalysis from '../pages/RateAnalysis';
import ProjectScheduler from '../pages/ProjectScheduler';
import RiskManager from '../pages/RiskManager';
import ReportingSuite from '../pages/ReportingSuite';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: 'drawing-analyzer', element: <DrawingAnalyzer /> },
      { path: 'boq-generator', element: <BoQGenerator /> },
      { path: 'quantity-surveyor', element: <QuantitySurveyor /> },
      { path: 'rate-analysis', element: <RateAnalysis /> },
      { path: 'project-scheduler', element: <ProjectScheduler /> },
      { path: 'risk-manager', element: <RiskManager /> },
      { path: 'reporting-suite', element: <ReportingSuite /> },
    ],
  },
]);

const AppRouter: React.FC = () => {
  return <RouterProvider router={router} />;
};

export default AppRouter;
