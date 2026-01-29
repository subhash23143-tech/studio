'use client';

import { useState, useEffect, useMemo } from 'react';
import type { Task } from '@/lib/definitions';
import AddTaskForm from '@/components/AddTaskForm';
import TaskList from '@/components/TaskList';
import { VerdantFlowLogo } from '@/components/VerdantFlowLogo';
import Loading from './loading';

// Mock data for initial load
const initialTasks: Task[] = [
  { id: '1', title: 'Plan weekly meals', description: 'Breakfast, lunch, and dinner for the next 7 days.', completed: false, deadline: new Date(new Date().setDate(new Date().getDate() + 1))},
  { id: '2', title: 'Submit the project report', description: 'Final report for Q2.', completed: false, deadline: new Date(new Date().setDate(new Date().getDate() + 2)) },
  { id: '3', title: 'Call the dentist', description: 'Schedule a check-up for next month.', completed: true },
  { id: '4', title: 'Buy birthday gift for Alex', completed: false, deadline: new Date(new Date().setDate(new Date().getDate() + 5))},
  { id: '5', title: 'Water the plants', completed: true },
];

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // In a real app, you'd fetch data or load from localStorage here.
    // We use a timeout to simulate an async operation.
    const timer = setTimeout(() => {
      setTasks(initialTasks);
      setIsMounted(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const handleAddTask = (newTaskData: Omit<Task, 'id' | 'completed'>) => {
    const newTask: Task = {
      ...newTaskData,
      id: Date.now().toString(),
      completed: false,
    };
    setTasks((prevTasks) => [newTask, ...prevTasks]);
  };

  const handleToggleComplete = (id: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleDeleteTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };
  
  const handleUpdateTask = (updatedTask: Task) => {
    setTasks(tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task)));
  }

  const handleSetTasks = (newTasks: Task[]) => {
    setTasks(newTasks);
  };
  
  const { todoTasks, completedTasks } = useMemo(() => {
    const todo = tasks.filter((task) => !task.completed);
    const completed = tasks.filter((task) => task.completed);
    return { todoTasks: todo, completedTasks: completed };
  }, [tasks]);

  if (!isMounted) {
    return <Loading />;
  }

  return (
    <div className="flex flex-col items-center min-h-screen p-4 sm:p-6 lg:p-8">
      <main className="w-full max-w-4xl">
        <header className="flex items-center gap-3 mb-8">
          <VerdantFlowLogo className="w-10 h-10 text-accent" />
          <h1 className="text-4xl font-bold font-headline text-accent">
            VerdantFlow
          </h1>
        </header>

        <section aria-labelledby="add-task-heading" className="mb-8">
          <h2 id="add-task-heading" className="sr-only">Add a new task</h2>
          <AddTaskForm onAddTask={handleAddTask} />
        </section>

        <TaskList
          tasks={todoTasks}
          completedTasks={completedTasks}
          onSetTasks={handleSetTasks}
          onToggleComplete={handleToggleComplete}
          onDeleteTask={handleDeleteTask}
          onUpdateTask={handleUpdateTask}
        />
      </main>
      <footer className="mt-16 text-center text-muted-foreground text-sm">
        <p>Organize your day, find your flow.</p>
      </footer>
    </div>
  );
}
