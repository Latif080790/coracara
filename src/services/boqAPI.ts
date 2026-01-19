
import { BoQItem } from '../store/boqStore';

const FAKE_LATENCY = 500; // 500ms latency
const STORAGE_KEY = 'boqData';

// Initial data to populate if localStorage is empty
const initialData: BoQItem[] = [
    {
        key: '1',
        item: 'A',
        description: 'Architectural Works',
        children: [
          {
            key: '1-1',
            item: 'A.1',
            description: 'Concrete Works',
            children: [
              {
                key: '1-1-1',
                item: 'A.1.1',
                description: 'Foundation Concrete',
                unit: 'm³',
                quantity: 120,
                rate: 1500000,
              },
            ],
          },
        ],
      },
      {
        key: '2',
        item: 'S',
        description: 'Structural Works',
      },
];

/**
 * Fetches BoQ data from localStorage to simulate an API call.
 * If no data is found, it initializes with a default dataset.
 */
export const fetchBoQData = async (): Promise<BoQItem[]> => {
  console.log('Simulating API: Fetching data...');
  return new Promise(resolve => {
    setTimeout(() => {
      try {
        const storedData = localStorage.getItem(STORAGE_KEY);
        if (storedData) {
          console.log('Simulating API: Data found in localStorage.');
          resolve(JSON.parse(storedData));
        } else {
          console.log('Simulating API: No data found, returning initial data.');
          localStorage.setItem(STORAGE_KEY, JSON.stringify(initialData));
          resolve(initialData);
        }
      } catch (error) {
        console.error('Failed to fetch BoQ data:', error);
        resolve(initialData); // Resolve with initial data on error
      }
    }, FAKE_LATENCY);
  });
};

/**
 * Saves BoQ data to localStorage to simulate an API call.
 */
export const saveBoQData = async (data: BoQItem[]): Promise<void> => {
    console.log('Simulating API: Saving data...');
  return new Promise((resolve, reject) => {
    setTimeout(() => {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
            console.log('Simulating API: Data saved successfully.');
            resolve();
        } catch (error) {
            console.error('Failed to save BoQ data:', error);
            reject(error);
        }
    }, FAKE_LATENCY);
  });
};
