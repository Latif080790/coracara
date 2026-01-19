
import {create} from 'zustand';
import { persist } from 'zustand/middleware';

// Define the interface for a single BoQ item
export interface BoQItem {
  key: string;
  item: string;
  description: string;
  unit: string;
  quantity: number;
  rate: number;
  amount?: number; // Calculated: quantity * rate
  children?: BoQItem[];
}

// Define the state structure
interface BoQState {
  items: BoQItem[];
  addItem: (newItemData: Omit<BoQItem, 'key'>, parentId?: string | null) => void;
  updateItem: (key: string, updatedValues: Partial<Omit<BoQItem, 'key' | 'children'>>) => void;
  removeItem: (key: string) => void;
}

// Helper to recursively find and add an item
const addRecursive = (items: BoQItem[], newItem: BoQItem, parentId: string): BoQItem[] => {
    return items.map(item => {
        if (item.key === parentId) {
            return { ...item, children: [...(item.children || []), newItem] };
        }
        if (item.children) {
            return { ...item, children: addRecursive(item.children, newItem, parentId) };
        }
        return item;
    });
};

// Helper to recursively find and update an item
const updateRecursive = (items: BoQItem[], key: string, updatedValues: Partial<Omit<BoQItem, 'key' | 'children'>>): BoQItem[] => {
    return items.map(item => {
        if (item.key === key) {
            return { ...item, ...updatedValues };
        }
        if (item.children) {
            return { ...item, children: updateRecursive(item.children, key, updatedValues) };
        }
        return item;
    });
};

// Helper to recursively find and remove an item
const removeRecursive = (items: BoQItem[], key: string): BoQItem[] => {
    return items.filter(item => {
        if (item.key === key) return false;
        if (item.children) {
            item.children = removeRecursive(item.children, key);
        }
        return true;
    });
};

const useBoqStore = create<BoQState>()(
    persist(
        (set) => ({
            items: [
              {
                key: '1',
                item: 'A',
                description: 'Pekerjaan Persiapan',
                unit: 'ls',
                quantity: 1,
                rate: 1500000,
                children: [
                  { key: '1.1', item: 'A.1', description: 'Pembersihan Lokasi', unit: 'm²', quantity: 100, rate: 25000 },
                  { key: '1.2', item: 'A.2', description: 'Pengukuran & Pematokan', unit: 'm²', quantity: 100, rate: 15000 },
                ],
              },
              {
                key: '2',
                item: 'B',
                description: 'Pekerjaan Struktur',
                unit: 'ls',
                quantity: 1,
                rate: 125000000,
                children: [
                  { key: '2.1', item: 'B.1', description: 'Beton K-250', unit: 'm³', quantity: 50, rate: 1200000 },
                  { key: '2.2', item: 'B.2', description: 'Besi Beton Polos', unit: 'kg', quantity: 2500, rate: 15000 },
                ],
              },
            ],
          
            addItem: (newItemData, parentId) => set(state => {
                const newItem: BoQItem = { 
                    ...newItemData,
                    key: new Date().getTime().toString(), // Simple unique key
                };

                if (!parentId) {
                    return { items: [...state.items, newItem] };
                }

                return { items: addRecursive(state.items, newItem, parentId) };
            }),
          
            updateItem: (key, updatedValues) => set(state => ({
                items: updateRecursive(state.items, key, updatedValues)
            })),
          
            removeItem: (key) => set(state => ({
                items: removeRecursive(state.items, key)
            })),
        }),
        {
            name: 'boq-storage',
        }
    )
);

export default useBoqStore;
