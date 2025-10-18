import { CATEGORY_ICONS } from './constants';

/**
 * Obtiene el icono correspondiente a una categoría
 * @param {string} categoryName - Nombre de la categoría
 * @returns {Component} - Componente del icono
 */
export const getCategoryIcon = (categoryName) => {
  return CATEGORY_ICONS[categoryName] || CATEGORY_ICONS['Otro'];
};

/**
 * Encuentra una categoría por ID
 * @param {Array} categories - Array de categorías
 * @param {number|string} categoryId - ID de la categoría
 * @returns {Object|null} - Objeto de categoría o null
 */
export const findCategoryById = (categories, categoryId) => {
  return categories.find(cat => cat.id === parseInt(categoryId)) || null;
};

/**
 * Genera estilos para una categoría basados en su color
 * @param {Object} category - Objeto de categoría
 * @returns {Object} - Estilos CSS
 */
export const getCategoryStyles = (category) => {
  if (!category) return {};

  return {
    backgroundColor: `${category.color}15`,
    borderColor: `${category.color}30`,
    color: category.color
  };
};

/**
 * Filtra tareas por criterios múltiples
 * @param {Array} tasks - Array de tareas
 * @param {Object} filters - Objeto con filtros
 * @returns {Array} - Tareas filtradas
 */
export const filterTasks = (tasks, filters) => {
  const { searchTerm, filter, categoryFilter } = filters;

  return tasks.filter(task => {
    const matchesSearch = !searchTerm ||
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (task.description || '').toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter = filter === 'all' ||
      (filter === 'completed' && task.done) ||
      (filter === 'pending' && !task.done) ||
      (filter === 'overdue' && task.is_overdue && !task.done);

    const matchesCategory = !categoryFilter ||
      task.category?.toString() === categoryFilter;

    return matchesSearch && matchesFilter && matchesCategory;
  });
};