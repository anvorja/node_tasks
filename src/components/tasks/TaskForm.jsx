import React, { useState, useEffect } from 'react';
import { Tag, Star, Calendar, Save, AlertTriangle } from 'lucide-react';
import styles from '../../styles/TaskManager.module.css';

const TaskForm = ({
  task,
  categories,
  onSave,
  onCancel,
  isEditing = false,
}) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    priority: 'medium',
    due_date: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Configuración de prioridades
  const priorityOptions = [
    { value: 'low', label: 'Baja', className: styles.priorityLow },
    { value: 'medium', label: 'Media', className: styles.priorityMedium },
    { value: 'high', label: 'Alta', className: styles.priorityHigh }
  ];

  // Cargar datos de la tarea si estamos editando
  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title || '',
        description: task.description || '',
        category: task.category || '',
        priority: task.priority || 'medium',
        due_date: task.due_date ? task.due_date.split('T')[0] : ''
      });
    }
  }, [task]);

  // Validar formulario
  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = 'El título es requerido';
    } else if (formData.title.trim().length > 200) {
      newErrors.title = 'El título no puede tener más de 200 caracteres';
    }

    if (formData.description && formData.description.length > 1000) {
      newErrors.description = 'La descripción no puede tener más de 1000 caracteres';
    }

    // Validar fecha límite
    if (formData.due_date) {
      const selectedDate = new Date(formData.due_date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (selectedDate < today) {
        newErrors.due_date = 'La fecha límite no puede ser anterior a hoy';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Manejar cambios en inputs
  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    // Limpiar error del campo cuando el usuario empiece a escribir
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: undefined
      }));
    }
  };

  // Manejar envío del formulario
  const handleSubmit = async () => {
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const submitData = {
        ...formData,
        due_date: formData.due_date ? `${formData.due_date}T00:00:00Z` : null
      };

      await onSave(submitData);
    } catch (error) {
      console.error('Error saving task:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Obtener fecha mínima (hoy)
  const getMinDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  return (
    <div className={styles.formContainer}>
      {/* Título */}
      <div className={styles.formField}>
        <label className={styles.formLabel}>
          Título de la tarea *
        </label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => handleInputChange('title', e.target.value)}
          className={`${styles.formInput} ${styles.formInputLarge} ${errors.title ? styles.formInputError : ''}`}
          placeholder="Ej: Completar proyecto de React"
          maxLength={200}
          disabled={isSubmitting}
        />
        {errors.title && (
          <div className={styles.formError}>
            <AlertTriangle size={16} />
            {errors.title}
          </div>
        )}
        <div className={styles.characterCounter}>
          {formData.title.length}/200 caracteres
        </div>
      </div>

      {/* Descripción */}
      <div className={styles.formField}>
        <label className={styles.formLabel}>
          Descripción (opcional)
        </label>
        <textarea
          value={formData.description}
          onChange={(e) => handleInputChange('description', e.target.value)}
          rows={4}
          className={`${styles.formTextarea} ${errors.description ? styles.formInputError : ''}`}
          placeholder="Describe los detalles de tu tarea..."
          maxLength={1000}
          disabled={isSubmitting}
        />
        {errors.description && (
          <div className={styles.formError}>
            <AlertTriangle size={16} />
            {errors.description}
          </div>
        )}
        <div className={styles.characterCounter}>
          {formData.description.length}/1000 caracteres
        </div>
      </div>

      {/* Grid de campos */}
      <div className={styles.formGrid}>
        {/* Categoría */}
        <div className={styles.formField}>
          <label className={styles.formLabel}>
            <Tag className={styles.formLabelIcon} />
            Categoría
          </label>
          <select
            value={formData.category}
            onChange={(e) => handleInputChange('category', e.target.value)}
            className={styles.formSelect}
            disabled={isSubmitting}
          >
            <option value="">Sin categoría</option>
            {categories.map(cat => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        {/* Prioridad */}
        <div className={styles.formField}>
          <label className={styles.formLabel}>
            <Star className={styles.formLabelIcon} />
            Prioridad
          </label>
          <select
            value={formData.priority}
            onChange={(e) => handleInputChange('priority', e.target.value)}
            className={styles.formSelect}
            disabled={isSubmitting}
          >
            {priorityOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>

          {/* Vista previa de prioridad */}
          <div className={styles.priorityPreview}>
            <div className={`${styles.priorityTagPreview} ${
              priorityOptions.find(p => p.value === formData.priority)?.className || ''
            }`}>
              <Star size={16} className={formData.priority === 'high' ? 'fill-current' : ''} />
              {priorityOptions.find(p => p.value === formData.priority)?.label}
            </div>
          </div>
        </div>

        {/* Fecha límite */}
        <div className={styles.formField}>
          <label className={styles.formLabel}>
            <Calendar className={styles.formLabelIcon} />
            Fecha límite (opcional)
          </label>
          <input
            type="date"
            value={formData.due_date}
            onChange={(e) => handleInputChange('due_date', e.target.value)}
            min={getMinDate()}
            className={`${styles.formDateInput} ${errors.due_date ? styles.formInputError : ''}`}
            disabled={isSubmitting}
          />
          {errors.due_date && (
            <div className={styles.formError}>
              <AlertTriangle size={16} />
              {errors.due_date}
            </div>
          )}
          {formData.due_date && (
            <div className={styles.formHelperText}>
              <Calendar size={14} />
              {new Date(formData.due_date).toLocaleDateString('es-ES', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </div>
          )}
        </div>
      </div>

      {/* Vista previa de la tarea */}
      {formData.title && (
        <div className={styles.formPreview}>
          <div className={styles.formPreviewTitle}>Vista previa:</div>
          <div className={styles.formPreviewCard}>
            <h3 className={styles.formPreviewTaskTitle}>{formData.title}</h3>
            {formData.description && (
              <p className={styles.formPreviewDescription}>{formData.description}</p>
            )}
            <div className={styles.formPreviewTags}>
              {formData.category && (
                <div className={`${styles.formPreviewTag}`} style={{
                  backgroundColor: `${categories.find(c => c.id === parseInt(formData.category))?.color || '#3b82f6'}15`,
                  borderColor: `${categories.find(c => c.id === parseInt(formData.category))?.color || '#3b82f6'}30`,
                  color: categories.find(c => c.id === parseInt(formData.category))?.color || '#3b82f6'
                }}>
                  <Tag size={12} />
                  {categories.find(c => c.id === parseInt(formData.category))?.name || 'Categoría'}
                </div>
              )}
              <div className={`${styles.formPreviewTag} ${
                priorityOptions.find(p => p.value === formData.priority)?.className || ''
              }`}>
                <Star size={12} className={formData.priority === 'high' ? 'fill-current' : ''} />
                {priorityOptions.find(p => p.value === formData.priority)?.label}
              </div>
              {formData.due_date && (
                <div className={`${styles.formPreviewTag} ${styles.priorityLow}`}>
                  <Calendar size={12} />
                  {new Date(formData.due_date).toLocaleDateString('es-ES')}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Botones */}
      <div className={styles.formActions}>
        <button
          onClick={handleSubmit}
          disabled={isSubmitting || !formData.title.trim()}
          className={`${styles.formButton} ${styles.formButtonPrimary}`}
        >
          {isSubmitting ? (
            <>
              <div className={styles.formSpinner}></div>
              {isEditing ? 'Actualizando...' : 'Creando...'}
            </>
          ) : (
            <>
              <Save size={20} />
              {isEditing ? 'Actualizar Tarea' : 'Crear Tarea'}
            </>
          )}
        </button>

        <button
          onClick={onCancel}
          disabled={isSubmitting}
          className={`${styles.formButton} ${styles.formButtonSecondary}`}
        >
          Cancelar
        </button>
      </div>
    </div>
  );
};

export default TaskForm;