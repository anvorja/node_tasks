import { useState, useEffect, useCallback } from 'react';
import { api } from '../services/api';

export const useCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Cargar categorías
  const loadCategories = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await api.categories.list();
      setCategories(data.results || data);
    } catch (err) {
      setError('Error al cargar las categorías');
      console.error('Error loading categories:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Crear categoría
  const createCategory = useCallback(async (categoryData) => {
    try {
      setError(null);
      await api.categories.create(categoryData);
      await loadCategories(); // Recargar datos
      return { success: true };
    } catch (err) {
      setError('Error al crear la categoría');
      console.error('Error creating category:', err);
      return { success: false, error: err.message };
    }
  }, [loadCategories]);

  // Actualizar categoría
  const updateCategory = useCallback(async (categoryId, categoryData) => {
    try {
      setError(null);
      await api.categories.update(categoryId, categoryData);
      await loadCategories(); // Recargar datos
      return { success: true };
    } catch (err) {
      setError('Error al actualizar la categoría');
      console.error('Error updating category:', err);
      return { success: false, error: err.message };
    }
  }, [loadCategories]);

  // Eliminar categoría
  const deleteCategory = useCallback(async (categoryId) => {
    try {
      setError(null);
      await api.categories.delete(categoryId);
      await loadCategories(); // Recargar datos
      return { success: true };
    } catch (err) {
      setError('Error al eliminar la categoría');
      console.error('Error deleting category:', err);
      return { success: false, error: err.message };
    }
  }, [loadCategories]);

  // Cargar datos al montar el componente
  useEffect(() => {
    loadCategories();
  }, [loadCategories]);

  return {
    categories,
    loading,
    error,
    actions: {
      loadCategories,
      createCategory,
      updateCategory,
      deleteCategory
    }
  };
};