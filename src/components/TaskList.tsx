'use client';

import { Reorder } from 'framer-motion';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { TaskItem } from '@/components/TaskItem';
import type { Task } from '@/lib/definitions';

type TaskListProps = {
  tasks: Task[];
  completedTasks: Task[];
  onSetTasks: (tasks: Task[]) => void;
  onToggleComplete: (id: string) => void;
  onDeleteTask: (id: string) => void;
  onUpdateTask: (task: Task) => void;
};

export default function TaskList({
  tasks,
  completedTasks,
  onSetTasks,
  onToggleComplete,
  onDeleteTask
}: TaskListProps) {

  const handleMove = (index: number, direction: 'up' | 'down') => {
    const newTasks = [...tasks];
    const taskToMove = newTasks[index];
    const swapIndex = direction === 'up' ? index - 1 : index + 1;
    
    if (swapIndex < 0 || swapIndex >= newTasks.length) {
      return;
    }

    newTasks[index] = newTasks[swapIndex];
    newTasks[swapIndex] = taskToMove;
    onSetTasks(newTasks);
  };
  
  if (tasks.length === 0 && completedTasks.length === 0) {
    return (
       <div className="text-center py-16 px-4 border-2 border-dashed rounded-lg">
        <h3 className="text-xl font-medium text-muted-foreground">No tasks yet!</h3>
        <p className="text-muted-foreground mt-2">Add a task above to get started.</p>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <section aria-labelledby="todo-heading">
        <h2 id="todo-heading" className="text-2xl font-semibold mb-4 font-headline">To Do <span className="text-base font-normal text-muted-foreground">({tasks.length})</span></h2>
        {tasks.length > 0 ? (
          <Reorder.Group axis="y" values={tasks} onReorder={onSetTasks} className="space-y-3">
            {tasks.map((task, index) => (
              <Reorder.Item key={task.id} value={task}
                dragListener={false}
              >
                {(props) => (
                  <TaskItem
                    task={task}
                    onToggleComplete={onToggleComplete}
                    onDelete={onDeleteTask}
                    onMoveUp={() => handleMove(index, 'up')}
                    onMoveDown={() => handleMove(index, 'down')}
                    isFirst={index === 0}
                    isLast={index === tasks.length - 1}
                    dragHandleProps={props.dragControls}
                  />
                )}
              </Reorder.Item>
            ))}
          </Reorder.Group>
        ) : (
          <p className="text-muted-foreground italic">Nothing to do. Time for a break!</p>
        )}
      </section>

      {completedTasks.length > 0 && (
        <section aria-labelledby="completed-heading">
          <Accordion type="single" collapsible>
            <AccordionItem value="completed">
              <AccordionTrigger className="text-xl font-semibold font-headline">
                Completed <span className="text-base font-normal text-muted-foreground">({completedTasks.length})</span>
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-3 pt-4">
                  {completedTasks.map((task) => (
                    <TaskItem
                      key={task.id}
                      task={task}
                      onToggleComplete={onToggleComplete}
                      onDelete={onDeleteTask}
                      onMoveUp={() => {}}
                      onMoveDown={() => {}}
                      isFirst={true}
                      isLast={true}
                      dragHandleProps={{}}
                    />
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </section>
      )}
    </div>
  );
}
