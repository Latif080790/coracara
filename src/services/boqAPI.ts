
// src/services/boqAPI.ts
import { type BoQItem } from '../store/boqStore';

const mockBoqData: BoQItem[] = [
  {
    key: '1',
    item: 'DIV-01',
    description: 'General Requirements',
    unit: '-', // Added missing property
    quantity: 1, // Added missing property
    rate: 5000000, // Added missing property
    children: [
      {
        key: '1-1',
        item: '1.01',
        description: 'Project Management & Supervision',
        unit: 'LS',
        quantity: 1,
        rate: 2500000,
      },
      {
        key: '1-2',
        item: '1.02',
        description: 'Temporary Facilities',
        unit: 'LS',
        quantity: 1,
        rate: 2500000,
      },
    ],
  },
  {
    key: '2',
    item: 'DIV-02',
    description: 'Site Work',
    unit: '-', // Added missing property
    quantity: 1, // Added missing property
    rate: 12000000, // Added missing property
  },
];


// Simulate an API call
export const fetchBoqData = (): Promise<BoQItem[]> => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(mockBoqData);
    }, 500);
  });
};
