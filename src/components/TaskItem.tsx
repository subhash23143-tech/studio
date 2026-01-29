'use client';

import { format } from 'date-fns';
import { Calendar, ChevronDown, ChevronUp, GripVertical, Trash2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { cn } from '@/lib/utils';
import type { Task } from '@/lib/definitions';

type TaskItemProps = {
  task: Task;
  onToggleComplete: (id: string) => void;
  onDelete: (id: string) => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
  isFirst: boolean;
  isLast: boolean;
  dragHandleProps: any;
};

export function TaskItem({
  task,
  onToggleComplete,
  onDelete,
  onMoveUp,
  onMoveDown,
  isFirst,
  isLast,
  dragHandleProps
}: TaskItemProps) {
  return (
    <Card
      className={cn(
        'transition-all duration-300',
        task.completed ? 'bg-secondary/50' : 'bg-card'
      )}
    >
      <CardContent className="p-4 flex items-start gap-4">
        <div className="flex items-center h-full pt-1">
          <Checkbox
            id={`task-${task.id}`}
            checked={task.completed}
            onCheckedChange={() => onToggleComplete(task.id)}
            aria-label={`Mark "${task.title}" as ${task.completed ? 'incomplete' : 'complete'}`}
            className="w-6 h-6"
          />
        </div>
        <div className="flex-grow">
          <label
            htmlFor={`task-${task.id}`}
            className={cn(
              'font-medium text-lg cursor-pointer transition-colors',
              task.completed ? 'line-through text-muted-foreground' : 'text-card-foreground'
            )}
          >
            {task.title}
          </label>
          {task.description && (
            <p className={cn('text-sm text-muted-foreground mt-1', task.completed && 'line-through')}>
              {task.description}
            </p>
          )}
          {task.deadline && (
            <div className="flex items-center gap-2 text-xs text-muted-foreground mt-2">
              <Calendar className="h-3 w-3" />
              <span>{format(task.deadline, 'PPP')}</span>
            </div>
          )}
        </div>
        <div className="flex items-center gap-1">
           <div className="flex-col hidden sm:flex">
             <Button variant="ghost" size="icon" className="h-7 w-7" onClick={onMoveUp} disabled={isFirst} aria-label="Move task up">
               <ChevronUp className="h-4 w-4" />
             </Button>
             <Button variant="ghost" size="icon" className="h-7 w-7" onClick={onMoveDown} disabled={isLast} aria-label="Move task down">
               <ChevronDown className="h-4 w-4" />
             </Button>
           </div>
           <Button
            variant="ghost"
            size="icon"
            className="cursor-grab"
            {...dragHandleProps}
          >
            <GripVertical className="h-5 w-5 text-muted-foreground" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onDelete(task.id)}
            className="text-muted-foreground hover:text-destructive hover:bg-destructive/10 h-9 w-9"
            aria-label={`Delete task "${task.title}"`}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
