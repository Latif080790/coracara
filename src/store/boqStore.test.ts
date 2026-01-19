
import { describe, it, expect, beforeEach } from 'vitest';
import useBoqStore from './boqStore';

// Reset the store before each test to ensure isolation
beforeEach(() => {
  useBoqStore.setState(useBoqStore.getState());
});

describe('useBoqStore', () => {
  it('should add a new root item', () => {
    const initialCount = useBoqStore.getState().items.length;
    useBoqStore.getState().addItem();
    expect(useBoqStore.getState().items.length).toBe(initialCount + 1);
  });

  it('should update an item\'s quantity', () => {
    const keyToUpdate = '1.1'; // Update a child item
    const newQuantity = 150;
    useBoqStore.getState().updateItem(keyToUpdate, 'quantity', newQuantity);

    const items = useBoqStore.getState().items;
    const parentItem = items.find(item => item.key === '1');
    const updatedItem = parentItem?.children?.find(child => child.key === keyToUpdate);

    expect(updatedItem?.quantity).toBe(newQuantity);
  });

  it('should remove an item', () => {
    const keyToRemove = '2.1';
    useBoqStore.getState().removeItem(keyToRemove);
    
    const items = useBoqStore.getState().items;
    const parentItem = items.find(item => item.key === '2');

    expect(parentItem?.children?.find(child => child.key === keyToRemove)).toBeUndefined();
  });
});
