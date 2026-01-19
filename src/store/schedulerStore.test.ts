
import { describe, it, expect, beforeEach } from 'vitest';
import useSchedulerStore, { Task } from './schedulerStore';

// Mengatur ulang store ke state awal sebelum setiap pengujian untuk memastikan isolasi
beforeEach(() => {
  // Mengambil state awal dari implementasi store
  const initialState = useSchedulerStore.getState();
  // Membuat ulang tugas awal untuk menghindari mutasi antar pengujian
  const initialTasks: Task[] = [
    { id: 'A', name: 'Penggalian', duration: 2, predecessors: [], earlyStart: 0, earlyFinish: 0, lateStart: 0, lateFinish: 0, isCritical: false },
    { id: 'B', name: 'Pondasi', duration: 4, predecessors: ['A'], earlyStart: 0, earlyFinish: 0, lateStart: 0, lateFinish: 0, isCritical: false },
    { id: 'C', name: 'Struktur', duration: 5, predecessors: ['B'], earlyStart: 0, earlyFinish: 0, lateStart: 0, lateFinish: 0, isCritical: false },
    { id: 'D', name: 'Atap', duration: 3, predecessors: ['C'], earlyStart: 0, earlyFinish: 0, lateStart: 0, lateFinish: 0, isCritical: false },
    { id: 'E', name: 'Pekerjaan Eksterior', duration: 4, predecessors: ['D'], earlyStart: 0, earlyFinish: 0, lateStart: 0, lateFinish: 0, isCritical: false },
    { id: 'F', name: 'Pekerjaan Interior', duration: 6, predecessors: ['E'], earlyStart: 0, earlyFinish: 0, lateStart: 0, lateFinish: 0, isCritical: false },
    { id: 'G', name: 'Penyelesaian', duration: 2, predecessors: ['F'], earlyStart: 0, earlyFinish: 0, lateStart: 0, lateFinish: 0, isCritical: false },
  ];
  useSchedulerStore.setState({ ...initialState, tasks: initialTasks });
});

describe('useSchedulerStore', () => {
  it('should add a new task', () => {
    const initialCount = useSchedulerStore.getState().tasks.length;
    useSchedulerStore.getState().addTask('Tugas Baru', 5, ['A']);
    const tasks = useSchedulerStore.getState().tasks;
    expect(tasks.length).toBe(initialCount + 1);
    expect(tasks[tasks.length - 1].name).toBe('Tugas Baru');
  });

  it('should correctly calculate the critical path', () => {
    // Panggil aksi utama
    useSchedulerStore.getState().calculateCriticalPath();
    const tasks = useSchedulerStore.getState().tasks;

    // Durasi proyek total harus sama dengan Waktu Selesai Paling Akhir dari tugas terakhir
    const projectDuration = 26; // 2+4+5+3+4+6+2

    // Verifikasi Waktu Selesai Paling Akhir
    tasks.forEach(task => {
        expect(task.lateFinish).toBeGreaterThan(0);
    });
    
    const lastTask = tasks.find(t => t.id === 'G');
    expect(lastTask?.lateFinish).toBe(projectDuration);

    // Verifikasi bahwa semua tugas memiliki slack nol, karena ini adalah rantai linear
    tasks.forEach(task => {
      const slack = task.lateStart - task.earlyStart;
      expect(slack).toBe(0);
      expect(task.isCritical).toBe(true);
    });
  });

  it('should handle a more complex graph with non-critical tasks', () => {
    const tasks: Task[] = [
        { id: 'A', name: 'Start', duration: 3, predecessors: [], earlyStart: 0, earlyFinish: 0, lateStart: 0, lateFinish: 0, isCritical: false },
        { id: 'B', name: 'Side Task', duration: 2, predecessors: ['A'], earlyStart: 0, earlyFinish: 0, lateStart: 0, lateFinish: 0, isCritical: false },
        { id: 'C', name: 'Main Path', duration: 5, predecessors: ['A'], earlyStart: 0, earlyFinish: 0, lateStart: 0, lateFinish: 0, isCritical: false },
        { id: 'D', name: 'Finish', duration: 2, predecessors: ['B', 'C'], earlyStart: 0, earlyFinish: 0, lateStart: 0, lateFinish: 0, isCritical: false },
    ];
    useSchedulerStore.setState({ tasks });
    useSchedulerStore.getState().calculateCriticalPath();
    const results = useSchedulerStore.getState().tasks;

    const taskA = results.find(t => t.id === 'A')!;
    const taskB = results.find(t => t.id === 'B')!;
    const taskC = results.find(t => t.id === 'C')!;
    const taskD = results.find(t => t.id === 'D')!;

    // Jalur A -> C -> D adalah kritis (3 + 5 + 2 = 10 hari)
    // Jalur A -> B -> D bukan kritis (3 + 2 + 2 = 7 hari)
    expect(taskA.isCritical).toBe(true);
    expect(taskC.isCritical).toBe(true);
    expect(taskD.isCritical).toBe(true);
    expect(taskB.isCritical).toBe(false);

    // Verifikasi slack untuk tugas non-kritis
    const slackB = taskB.lateStart - taskB.earlyStart;
    expect(slackB).toBe(3); // LS(B) = LF(D) - Dur(D) - Dur(B) = 10-2-2=6. ES(B)=EF(A)=3. Slack = 6-3=3
  });
});
