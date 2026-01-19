
import {create} from 'zustand';
import { persist } from 'zustand/middleware';

export interface Task {
  id: string;
  name: string;
  duration: number;
  predecessors: string[];
  earlyStart?: number;
  earlyFinish?: number;
  lateStart?: number;
  lateFinish?: number;
  isCritical?: boolean;
}

interface SchedulerState {
  tasks: Task[];
  addTask: (name: string, duration: number, predecessors: string[]) => void;
  updateTask: (id: string, updatedTask: Partial<Omit<Task, 'id'>>) => void;
  removeTask: (id: string) => void;
  calculateCriticalPath: () => void;
}

// A simple utility to generate a new task ID
const generateTaskId = (tasks: Task[]): string => {
    const existingIds = tasks.map(t => parseInt(t.id, 10)).filter(id => !isNaN(id));
    const maxId = existingIds.length > 0 ? Math.max(...existingIds) : 0;
    return (maxId + 1).toString();
};


const useSchedulerStore = create<SchedulerState>()(persist(
    (set, get) => ({
        tasks: [
            { id: '1', name: 'Foundation', duration: 5, predecessors: [] },
            { id: '2', name: 'Framing', duration: 10, predecessors: ['1'] },
            { id: '3', name: 'Roofing', duration: 7, predecessors: ['2'] },
            { id: '4', name: 'Plumbing', duration: 6, predecessors: ['2'] },
            { id: '5', name: 'Electrical', duration: 8, predecessors: ['4'] },
            { id: '6', name: 'Drywall', duration: 9, predecessors: ['5'] },
            { id: '7', name: 'Painting', duration: 4, predecessors: ['6'] },
            { id: '8', name: 'Finishing', duration: 3, predecessors: ['7'] },
          ],
      
          addTask: (name, duration, predecessors) => {
            set(state => {
              const newId = generateTaskId(state.tasks);
              const newTask: Task = { id: newId, name, duration, predecessors };
              return { tasks: [...state.tasks, newTask] };
            });
          },
      
          updateTask: (id, updatedValues) => {
            set(state => ({
              tasks: state.tasks.map(task =>
                task.id === id ? { ...task, ...updatedValues } : task
              ),
            }));
          },
      
          removeTask: (id) => {
            set(state => ({
              tasks: state.tasks.filter(task => task.id !== id),
            }));
          },

        calculateCriticalPath: () => set(state => {
            const tasks = [...state.tasks];
            const taskMap: { [key: string]: Task } = {};
            tasks.forEach(task => {
                taskMap[task.id] = { ...task, earlyStart: 0, earlyFinish: 0, lateStart: 0, lateFinish: 0, isCritical: false };
            });

            // Forward Pass
            tasks.forEach(task => {
                const currentTask = taskMap[task.id];
                if (!currentTask) return;
                
                let maxEarlyFinish = 0;
                if(currentTask.predecessors){
                    currentTask.predecessors.forEach(pId => {
                        const pred = taskMap[pId];
                        if (pred && pred.earlyFinish) {
                            maxEarlyFinish = Math.max(maxEarlyFinish, pred.earlyFinish);
                        }
                    });
                }
                currentTask.earlyStart = maxEarlyFinish;
                currentTask.earlyFinish = maxEarlyFinish + currentTask.duration;
            });

            // Backward Pass
            const projectFinishTime = Math.max(...Object.values(taskMap).map(t => t.earlyFinish || 0));
            Object.values(taskMap).forEach(t => t.lateFinish = projectFinishTime);

            for (let i = tasks.length - 1; i >= 0; i--) {
                const currentTask = taskMap[tasks[i].id];
                if (!currentTask) continue;

                const successors = tasks.filter(t => t.predecessors.includes(currentTask.id));
                if (successors.length === 0) {
                    currentTask.lateFinish = projectFinishTime;
                } else {
                    const minLateStart = Math.min(...successors.map(s => taskMap[s.id].lateStart || 0));
                    currentTask.lateFinish = minLateStart;
                }
                currentTask.lateStart = currentTask.lateFinish - currentTask.duration;

                // Check for criticality
                if (currentTask.earlyStart === currentTask.lateStart && currentTask.earlyFinish === currentTask.lateFinish) {
                    currentTask.isCritical = true;
                }
            }

            return { tasks: Object.values(taskMap) };
        }),
    }),
    {
        name: 'scheduler-storage',
    }
));

export default useSchedulerStore;
