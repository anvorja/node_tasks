import React from 'react';
import { Search, Filter, Tag, Plus } from 'lucide-react';

import Button from '../ui/Button';
import { FILTER_OPTIONS } from '../../utils/constants';
import Input, {Select} from "../ui/input.jsx";

const TaskFilters = ({
  searchTerm,
  filter,
  categoryFilter,
  categories,
  onSearchChange,
  onFilterChange,
  onCategoryFilterChange,
  onNewTask,
  className = ''
}) => {
  return (
    <div className={`bg-white rounded-3xl p-8 shadow-lg border border-gray-200 ${className}`}>
      <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between">
        {/* Filtros */}
        <div className="flex flex-col sm:flex-row gap-4 flex-1">
          {/* Búsqueda */}
          <div className="flex-1 max-w-md">
            <Input
              icon={Search}
              placeholder="Buscar en tus tareas..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="text-lg"
            />
          </div>

          {/* Filtros de estado y categoría */}
          <div className="flex gap-4">
            <Select
              icon={Filter}
              value={filter}
              onChange={(e) => onFilterChange(e.target.value)}
              className="font-medium min-w-[160px]"
            >
              {Object.entries(FILTER_OPTIONS).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </Select>

            <Select
              icon={Tag}
              value={categoryFilter}
              onChange={(e) => onCategoryFilterChange(e.target.value)}
              className="font-medium min-w-[180px]"
            >
              <option value="">Todas las categorías</option>
              {categories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </Select>
          </div>
        </div>

        {/* Botón Nueva Tarea */}
        <Button
          variant="primary"
          icon={Plus}
          onClick={onNewTask}
          className="whitespace-nowrap"
        >
          Nueva Tarea
        </Button>
      </div>
    </div>
  );
};

export default TaskFilters;