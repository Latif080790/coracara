
import { describe, it, expect, beforeEach } from 'vitest';
import useBoqStore, { type BoQItem } from './boqStore';

// Reset the store to its initial state before each test
beforeEach(() => {
  useBoqStore.setState(useBoqStore.getInitialState());
});

describe('useBoqStore', () => {
  it('should add a new root item', () => {
    const initialCount = useBoqStore.getState().items.length;
    const newItem: Omit<BoQItem, 'key' | 'children'> = {
      item: 'DIV-03',
      description: 'New Test Division',
      unit: 'LS',
      quantity: 1,
      rate: 10000,
    };
    
    // Correctly call addItem with the new item data
    useBoqStore.getState().addItem(newItem, null);
    
    const newItems = useBoqStore.getState().items;
    expect(newItems.length).toBe(initialCount + 1);
    expect(newItems[newItems.length - 1].description).toBe('New Test Division');
  });

  it('should update an item\'s quantity', () => {
    const keyToUpdate = '1-1'; // Key from mock data
    const newQuantity = 999;

    // Correctly call updateItem with an object
    useBoqStore.getState().updateItem(keyToUpdate, { quantity: newQuantity });

    const items = useBoqStore.getState().items;
    const parentItem = items.find(item => item.key === '1');
    const updatedItem = parentItem?.children?.find(child => child.key === keyToUpdate);

    expect(updatedItem?.quantity).toBe(newQuantity);
  });

  it('should remove a child item', () => {
    const keyToRemove = '1-2'; // Key from mock data
    const parentItemBefore = useBoqStore.getState().items.find(i => i.key === '1');
    const initialChildCount = parentItemBefore?.children?.length || 0;

    useBoqStore.getState().removeItem(keyToRemove);
    
    const parentItemAfter = useBoqStore.getState().items.find(i => i.key === '1');
    const finalChildCount = parentItemAfter?.children?.length || 0;

    expect(finalChildCount).toBe(initialChildCount - 1);
    expect(parentItemAfter?.children?.find(child => child.key === keyToRemove)).toBeUndefined();
  });
});
