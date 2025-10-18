/**
 * Formatea una fecha para mostrar en la UI
 * @param {string} dateString - Fecha en formato ISO
 * @returns {string|null} - Fecha formateada o null
 */
export const formatDate = (dateString) => {
  if (!dateString) return null;

  return new Date(dateString).toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });
};

/**
 * Formatea una fecha para input de tipo date
 * @param {string} dateString - Fecha en formato ISO
 * @returns {string} - Fecha en formato YYYY-MM-DD
 */
export const formatDateForInput = (dateString) => {
  if (!dateString) return '';
  return dateString.split('T')[0];
};

/**
 * Convierte fecha de input a formato ISO
 * @param {string} dateValue - Fecha del input (YYYY-MM-DD)
 * @returns {string|null} - Fecha en formato ISO o null
 */
export const formatDateForAPI = (dateValue) => {
  if (!dateValue) return null;
  return `${dateValue}T00:00:00Z`;
};

/**
 * Verifica si una tarea está vencida
 * @param {Object} task - Objeto de tarea
 * @returns {boolean} - true si está vencida
 */
export const isTaskOverdue = (task) => {
  if (!task.due_date || task.done) return false;
  return new Date(task.due_date) < new Date();
};

/**
 * Obtiene la diferencia en días desde hoy
 * @param {string} dateString - Fecha en formato ISO
 * @returns {number} - Número de días (negativo si es pasado)
 */
export const getDaysFromToday = (dateString) => {
  if (!dateString) return 0;

  const today = new Date();
  const targetDate = new Date(dateString);
  const diffTime = targetDate - today;

  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};