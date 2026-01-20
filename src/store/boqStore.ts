
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
  children?: BoQItem[];
}

// --- AI Analysis Interfaces ---
export interface AIAnalysisResult {
    summary: string;
    recommendations: string[];
}

// --- State Interface ---
interface BoQState {
  items: BoQItem[];
  loading: boolean;
  error: string | null;
  analysis: AIAnalysisResult | null;
  addItem: (newItemData: Omit<BoQItem, 'key'>, parentId?: string | null) => void;
  updateItem: (key: string, updatedValues: Partial<Omit<BoQItem, 'key' | 'children'>>) => void;
  removeItem: (key: string) => void;
  analyzeBoq: () => void;
}

// --- Recursive Helper Functions ---
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

const removeRecursive = (items: BoQItem[], key: string): BoQItem[] => {
    return items.filter(item => {
        if (item.key === key) return false;
        if (item.children) {
            item.children = removeRecursive(item.children, key);
        }
        return true;
    });
};

const flattenBoq = (items: BoQItem[]): BoQItem[] => {
    let flatList: BoQItem[] = [];
    items.forEach(item => {
        flatList.push(item);
        if (item.children) {
            flatList = flatList.concat(flattenBoq(item.children));
        }
    });
    return flatList;
};

// --- Zustand Store ---
const useBoqStore = create<BoQState>()(
    persist(
        (set, get) => ({
            items: [
                { key: '1', item: 'A', description: 'Pekerjaan Persiapan', unit: 'ls', quantity: 1, rate: 1500000, children: [
                    { key: '1.1', item: 'A.1', description: 'Pembersihan Lokasi', unit: 'm²', quantity: 100, rate: 25000 },
                    { key: '1.2', item: 'A.2', description: 'Pengukuran & Pematokan', unit: 'm²', quantity: 100, rate: 15000 },
                ]},
                { key: '2', item: 'B', description: 'Pekerjaan Struktur', unit: 'ls', quantity: 1, rate: 125000000, children: [
                    { key: '2.1', item: 'B.1', description: 'Beton K-250', unit: 'm³', quantity: 50, rate: 1200000 },
                    { key: '2.2', item: 'B.2', description: 'Besi Beton Polos', unit: 'kg', quantity: 2500, rate: 15000 },
                ]},
            ],
            loading: false,
            error: null,
            analysis: null,
          
            addItem: (newItemData, parentId) => set(state => {
                const newItem: BoQItem = { ...newItemData, key: new Date().getTime().toString() };
                if (!parentId) return { items: [...state.items, newItem] };
                return { items: addRecursive(state.items, newItem, parentId) };
            }),
          
            updateItem: (key, updatedValues) => set(state => ({ items: updateRecursive(state.items, key, updatedValues) })),
          
            removeItem: (key) => set(state => ({ items: removeRecursive(state.items, key) })),

            analyzeBoq: () => {
                set({ loading: true, error: null });

                setTimeout(() => {
                    try {
                        const allItems = flattenBoq(get().items);
                        if (allItems.length === 0) {
                            set({ analysis: { summary: 'No items in the BoQ to analyze.', recommendations: [] }, loading: false });
                            return;
                        }

                        const sortedItems = allItems
                            .map(item => ({ ...item, totalCost: item.quantity * item.rate }))
                            .sort((a, b) => b.totalCost - a.totalCost);

                        const top3Items = sortedItems.slice(0, 3);

                        const summary = `The AI has identified ${top3Items.length} key cost drivers in your project. These items represent the most significant expenditure and offer the greatest potential for cost-saving optimizations.`;
                        const recommendations = top3Items.map(item => 
                            `For "${item.description}", which has a total cost of Rp ${item.totalCost.toLocaleString()}, consider sourcing alternative suppliers or negotiating a bulk purchase discount to reduce expenses.`
                        );

                        set({ analysis: { summary, recommendations }, loading: false });

                    } catch (e: any) {
                        set({ error: `An unexpected error occurred during analysis: ${e.message}`, loading: false });
                    }
                }, 1500); // Simulate network delay
            },
        }),
        {
            name: 'boq-storage',
        }
    )
);

export default useBoqStore;
