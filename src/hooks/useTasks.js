import { useState, useEffect, useCallback } from 'react';
import { api } from '../services/api';

export const useTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [stats, setStats] = useState({ total: 0, completed: 0, pending: 0, overdue: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Cargar tareas y estadísticas
  const loadTasks = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const [tasksData, statsData] = await Promise.all([
        api.tasks.list(),
        api.tasks.stats()
      ]);

      setTasks(tasksData.results || tasksData);
      setStats(statsData);
    } catch (err) {
      setError('Error al cargar las tareas');
      console.error('Error loading tasks:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Crear tarea
  const createTask = useCallback(async (taskData) => {
    try {
      setError(null);
      await api.tasks.create(taskData);
      await loadTasks(); // Recargar datos
      return { success: true };
    } catch (err) {
      setError('Error al crear la tarea');
      console.error('Error creating task:', err);
      return { success: false, error: err.message };
    }
  }, [loadTasks]);

  // Actualizar tarea
  const updateTask = useCallback(async (taskId, taskData) => {
    try {
      setError(null);
      await api.tasks.update(taskId, taskData);
      await loadTasks(); // Recargar datos
      return { success: true };
    } catch (err) {
      setError('Error al actualizar la tarea');
      console.error('Error updating task:', err);
      return { success: false, error: err.message };
    }
  }, [loadTasks]);

  // Alternar estado completado
  const toggleTask = useCallback(async (taskId) => {
    try {
      setError(null);
      await api.tasks.toggle(taskId);
      await loadTasks(); // Recargar datos
      return { success: true };
    } catch (err) {
      setError('Error al cambiar el estado de la tarea');
      console.error('Error toggling task:', err);
      return { success: false, error: err.message };
    }
  }, [loadTasks]);

  // Eliminar tarea
  const deleteTask = useCallback(async (taskId) => {
    try {
      setError(null);
      await api.tasks.delete(taskId);
      await loadTasks(); // Recargar datos
      return { success: true };
    } catch (err) {
      setError('Error al eliminar la tarea');
      console.error('Error deleting task:', err);
      return { success: false, error: err.message };
    }
  }, [loadTasks]);

  // Cargar datos al montar el componente
  useEffect(() => {
    loadTasks();
  }, [loadTasks]);

  return {
    tasks,
    stats,
    loading,
    error,
    actions: {
      loadTasks,
      createTask,
      updateTask,
      toggleTask,
      deleteTask
    }
  };
};