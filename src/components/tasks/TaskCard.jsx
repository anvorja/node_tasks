import React from 'react';
import { CheckCircle2, Circle, Edit3, Trash2, Calendar, AlertCircle, Star } from 'lucide-react';
import Button from '../ui/Button';
import { getCategoryIcon, findCategoryById, getCategoryStyles } from '../../utils/categoryUtils';
import { formatDate, isTaskOverdue } from '../../utils/dateUtils';
import { PRIORITY_CONFIG } from '../../utils/constants';

const TaskCard = ({
  task,
  categories,
  onToggle,
  onEdit,
  onDelete,
  className = ''
}) => {
  const category = findCategoryById(categories, task.category);
  const isOverdue = isTaskOverdue(task);
  const CategoryIcon = category ? getCategoryIcon(category.name) : null;
  const priorityInfo = PRIORITY_CONFIG[task.priority];

  const cardBorderClass = task.done
    ? 'border-green-200 bg-gradient-to-br from-green-50 to-emerald-50'
    : isOverdue
      ? 'border-red-200 bg-gradient-to-br from-red-50 to-pink-50'
      : 'border-gray-200 hover:border-blue-300';

  return (
    <div className={`
      bg-white rounded-2xl p-6 shadow-sm border-2 transition-all duration-300 
      hover:shadow-lg hover:-translate-y-1 ${cardBorderClass} ${className}
    `}>

      <div className="flex items-start justify-between mb-4">
        <div className="flex items-start gap-4 flex-1">
          {/* Toggle Button */}
          <Button
            variant="ghost"
            size="sm"
            icon={task.done ? CheckCircle2 : Circle}
            onClick={() => onToggle(task.id)}
            className={`mt-1 p-2 transition-all duration-300 transform hover:scale-110 ${
              task.done ? 'text-green-600' : 'text-gray-400 hover:text-green-600'
            }`}
          />

          <div className="flex-1 min-w-0">
            {/* Título */}
            <h3 className={`font-bold text-lg mb-2 transition-all duration-300 ${
              task.done ? 'line-through text-gray-500' : 'text-gray-900'
            }`}>
              {task.title}
            </h3>

            {/* Descripción */}
            {task.description && (
              <p className={`text-sm leading-relaxed mb-3 ${
                task.done ? 'text-gray-400' : 'text-gray-600'
              }`}>
                {task.description}
              </p>
            )}

            {/* Tags */}
            <div className="flex flex-wrap items-center gap-3">
              {/* Categoría */}
              {category && (
                <div
                  className="flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium border"
                  style={getCategoryStyles(category)}
                >
                  {CategoryIcon && <CategoryIcon className="w-4 h-4" />}
                  {category.name}
                </div>
              )}

              {/* Prioridad */}
              <div className={`
                flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium border 
                ${priorityInfo.bgColor} ${priorityInfo.textColor} ${priorityInfo.borderColor}
              `}>
                <Star className={`w-4 h-4 ${task.priority === 'high' ? 'fill-current' : ''}`} />
                {priorityInfo.label}
              </div>

              {/* Fecha límite */}
              {task.due_date && (
                <div className={`
                  flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium border
                  ${isOverdue && !task.done 
                    ? 'bg-red-50 text-red-700 border-red-200' 
                    : 'bg-gray-50 text-gray-700 border-gray-200'
                  }
                `}>
                  {isOverdue && !task.done ? (
                    <AlertCircle className="w-4 h-4" />
                  ) : (
                    <Calendar className="w-4 h-4" />
                  )}
                  {formatDate(task.due_date)}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Acciones */}
        <div className="flex items-center gap-2 ml-4">
          <Button
            variant="ghost"
            size="sm"
            icon={Edit3}
            onClick={() => onEdit(task)}
            className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg"
          />
          <Button
            variant="ghost"
            size="sm"
            icon={Trash2}
            onClick={() => onDelete(task.id)}
            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default TaskCard;