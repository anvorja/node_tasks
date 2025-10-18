import React from 'react';
import { Calendar, Plus } from 'lucide-react';
import TaskCard from './TaskCard';
import Button from '../ui/Button';

const EmptyState = ({
  hasFilters,
  onCreateTask
}) => {
  return (
    <div className="text-center py-16">
      <div className="bg-white rounded-3xl p-12 shadow-lg border border-gray-200 max-w-md mx-auto">
        <div className="w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
          <Calendar className="w-10 h-10 text-gray-400" />
        </div>

        <h3 className="text-xl font-bold text-gray-900 mb-3">
          {hasFilters ? 'No se encontraron tareas' : '¡Tu espacio está limpio!'}
        </h3>

        <p className="text-gray-600 mb-6">
          {hasFilters
            ? 'Intenta ajustar los filtros de búsqueda'
            : 'Crea tu primera tarea y comienza a ser más productivo'
          }
        </p>

        {!hasFilters && (
          <Button
            variant="primary"
            icon={Plus}
            onClick={onCreateTask}
            className="shadow-lg"
          >
            Crear Primera Tarea
          </Button>
        )}
      </div>
    </div>
  );
};

const TaskList = ({
  tasks,
  categories,
  onToggleTask,
  onEditTask,
  onDeleteTask,
  onCreateTask,
  hasFilters = false,
  loading = false,
  className = ''
}) => {
  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 animate-pulse"
          >
            <div className="flex items-start gap-4">
              <div className="w-6 h-6 bg-gray-200 rounded-full"></div>
              <div className="flex-1 space-y-3">
                <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                <div className="flex gap-2">
                  <div className="h-6 bg-gray-200 rounded-full w-20"></div>
                  <div className="h-6 bg-gray-200 rounded-full w-16"></div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <EmptyState
        hasFilters={hasFilters}
        onCreateTask={onCreateTask}
      />
    );
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {tasks.map(task => (
        <TaskCard
          key={task.id}
          task={task}
          categories={categories}
          onToggle={onToggleTask}
          onEdit={onEditTask}
          onDelete={onDeleteTask}
        />
      ))}
    </div>
  );
};

export default TaskList;