
import { describe, it, expect, beforeEach } from 'vitest';
import useSchedulerStore from './schedulerStore';

beforeEach(() => {
    // Reset the store to its initial state defined in the store file
    const initialState = useSchedulerStore.getState();
    useSchedulerStore.setState({
        ...initialState,
        tasks: [
            { id: '1', name: 'Foundation', duration: 5, predecessors: [] },
            { id: '2', name: 'Framing', duration: 10, predecessors: ['1'] },
            { id: '3', name: 'Roofing', duration: 7, predecessors: ['2'] },
            { id: '4', name: 'Plumbing', duration: 6, predecessors: ['2'] },
            { id: '5', name: 'Electrical', duration: 8, predecessors: ['4'] },
            { id: '6', name: 'Drywall', duration: 9, predecessors: ['5'] },
            { id: '7', name: 'Painting', duration: 4, predecessors: ['6'] },
            { id: '8', name: 'Finishing', duration: 3, predecessors: ['7'] },
        ]
    }, true);
});

describe('useSchedulerStore critical path calculation', () => {

  it('should calculate early and late start/finish times', () => {
    useSchedulerStore.getState().calculateCriticalPath();
    const tasks = useSchedulerStore.getState().tasks;

    // Find a specific task to check, e.g., Task '3' (Roofing)
    const task = tasks.find(t => t.id === '3');
    expect(task).toBeDefined();
    expect(task?.earlyStart).toBe(15); 
    expect(task?.earlyFinish).toBe(22);
    // More specific checks can be added based on a known correct calculation
  });

  it('should identify critical tasks correctly', () => {
    useSchedulerStore.getState().calculateCriticalPath();
    const tasks = useSchedulerStore.getState().tasks;
    const criticalPathIds = ['1', '2', '4', '5', '6', '7', '8']; // Based on the mock data

    tasks.forEach(task => {
        if (criticalPathIds.includes(task.id)) {
            expect(task.isCritical).toBe(true);
            // For critical tasks, slack (lateStart - earlyStart) should be 0
            expect(task.lateStart! - task.earlyStart!).toBe(0);
        } else {
            expect(task.isCritical).toBe(false);
        }
    });
  });
});

describe('useSchedulerStore task manipulation', () => {

    it('should add a new task and recalculate path', () => {
        const initialTaskCount = useSchedulerStore.getState().tasks.length;
        useSchedulerStore.getState().addTask('New Task', 5, ['8']);
        useSchedulerStore.getState().calculateCriticalPath();
        
        const newTasks = useSchedulerStore.getState().tasks;
        expect(newTasks.length).toBe(initialTaskCount + 1);

        const newTask = newTasks.find(t => t.name === 'New Task');
        expect(newTask).toBeDefined();
        expect(newTask?.isCritical).toBe(true); // Since it follows the last task
    });

    it('should update a task and affect the critical path', () => {
        // Increase duration of a non-critical task to make it critical
        const taskB = useSchedulerStore.getState().tasks.find(t => t.id === '3'); // Task 3 is not critical initially
        expect(taskB?.isCritical).toBe(false);

        useSchedulerStore.getState().updateTask('3', { duration: 25 });
        useSchedulerStore.getState().calculateCriticalPath();

        const updatedTasks = useSchedulerStore.getState().tasks;
        const updatedTaskB = updatedTasks.find(t => t.id === '3');
        expect(updatedTaskB?.isCritical).toBe(true); // It should now be critical
        expect(updatedTaskB!.lateStart! - updatedTaskB!.earlyStart!).toBe(0);
    });
});
