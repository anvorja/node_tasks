import React, { useState } from 'react';
import { BarChart3, CheckCircle2, Clock, AlertTriangle, CheckSquare, Search, Filter, Tag, Plus, Calendar, Edit3, Trash2, Circle, X } from 'lucide-react';
import styles from '../../styles/TaskManager.module.css';
import {useTasks} from "../../hooks/useTasks.js";
import {useCategories} from "../../hooks/useCategories.js";
import TaskForm from './TaskForm';

const TaskManager = () => {
    // Estados del componente
    const [searchTerm, setSearchTerm] = useState('');
    const [filter, setFilter] = useState('all');
    const [categoryFilter, setCategoryFilter] = useState('');
    const [showTaskModal, setShowTaskModal] = useState(false);
    const [editingTask, setEditingTask] = useState(null);
    // const [taskToDelete, setTaskToDelete] = useState(null);

    // Hooks personalizados
    const {
        tasks,
        stats,
        loading: tasksLoading,
        error: tasksError,
        actions: taskActions
    } = useTasks();

    const {
        categories,
        loading: categoriesLoading,
        error: categoriesError
    } = useCategories();

    // Loading general
    const isLoading = tasksLoading || categoriesLoading;

    // Filtrar tareas
    const filteredTasks = tasks.filter(task => {
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

    const hasActiveFilters = searchTerm || filter !== 'all' || categoryFilter;

    // Handlers de tareas
    const handleToggleTask = async (taskId) => {
        await taskActions.toggleTask(taskId);
    };

    const handleDeleteTask = async (taskId) => {
        if (window.confirm('¿Estás seguro de que quieres eliminar esta tarea?')) {
            await taskActions.deleteTask(taskId);
        }
    };

    const handleCreateTask = async (taskData) => {
        const result = await taskActions.createTask(taskData);
        if (result.success) {
            setShowTaskModal(false);
            setEditingTask(null);
        }
    };

    const handleUpdateTask = async (taskData) => {
        const result = await taskActions.updateTask(editingTask.id, taskData);
        if (result.success) {
            setShowTaskModal(false);
            setEditingTask(null);
        }
    };

    // Formatear fecha
    const formatDate = (dateString) => {
        if (!dateString) return null;
        return new Date(dateString).toLocaleDateString('es-ES', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        });
    };

    // Verificar si está vencida
    const isOverdue = (task) => {
        if (!task.due_date || task.done) return false;
        return new Date(task.due_date) < new Date();
    };

    // Loading state
    if (isLoading) {
        return (
            <div className={styles.loading}>
                <div className={styles.loadingContent}>
                    <div className={styles.spinner}></div>
                    <p className={styles.loadingText}>Cargando tu espacio de trabajo...</p>
                </div>
            </div>
        );
    }

    // Error state
    if (tasksError || categoriesError) {
        return (
            <div className={styles.loading}>
                <div className={styles.loadingContent}>
                    <div style={{ color: '#ef4444', marginBottom: '1rem' }}>
                        <AlertTriangle size={64} />
                    </div>
                    <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>Error al cargar datos</h2>
                    <p style={{ color: '#6b7280', marginBottom: '1rem' }}>
                        {tasksError || categoriesError}
                    </p>
                    <button
                        onClick={() => window.location.reload()}
                        className={styles.newTaskButton}
                    >
                        Reintentar
                    </button>
                </div>
            </div>
        );
    }



    return (
        <div className={styles.container}>
            <div className={styles.innerContainer}>

                {/* Header */}
                <div className={styles.header}>
                    <div className={styles.headerContent}>
                        <div className={styles.headerIcon}>
                            <CheckSquare size={32} color="white" />
                        </div>
                        <h1 className={styles.headerTitle}>TaskMaster Pro</h1>
                    </div>

                    <p className={styles.headerSubtitle}>
                        Organiza, prioriza y completa tus tareas con estilo.
                        <span className={styles.headerAccent}> ¡Tu productividad, optimizada!</span>
                    </p>
                </div>

                {/* Stats Cards */}
                <div className={styles.statsGrid}>
                    <div className={styles.statsCard}>
                        <div className={styles.statsCardHeader}>
                            <div className={styles.statsIconBlue}>
                                <BarChart3 size={24} />
                            </div>
                        </div>
                        <div>
                            <p className={styles.statsTitle}>Total de Tareas</p>
                            <p className={styles.statsValue}>{stats.total}</p>
                            <p className={styles.statsSubtitle}>En tu workspace</p>
                        </div>
                    </div>

                    <div className={styles.statsCard}>
                        <div className={styles.statsCardHeader}>
                            <div className={styles.statsIconGreen}>
                                <CheckCircle2 size={24} />
                            </div>
                        </div>
                        <div>
                            <p className={styles.statsTitle}>Completadas</p>
                            <p className={styles.statsValue}>{stats.completed}</p>
                            <p className={styles.statsSubtitle}>
                                {stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0}% completado
                            </p>
                        </div>
                    </div>

                    <div className={styles.statsCard}>
                        <div className={styles.statsCardHeader}>
                            <div className={styles.statsIconYellow}>
                                <Clock size={24} />
                            </div>
                        </div>
                        <div>
                            <p className={styles.statsTitle}>Pendientes</p>
                            <p className={styles.statsValue}>{stats.pending}</p>
                            <p className={styles.statsSubtitle}>Por hacer</p>
                        </div>
                    </div>

                    <div className={styles.statsCard}>
                        <div className={styles.statsCardHeader}>
                            <div className={styles.statsIconRed}>
                                <AlertTriangle size={24} />
                            </div>
                        </div>
                        <div>
                            <p className={styles.statsTitle}>Vencidas</p>
                            <p className={styles.statsValue}>{stats.overdue}</p>
                            <p className={styles.statsSubtitle}>Requieren atención</p>
                        </div>
                    </div>
                </div>

                {/* Filtros */}
                <div className={styles.filtersContainer}>
                    <div className={styles.filtersContent}>
                        <div className={styles.filtersLeft}>
                            {/* Búsqueda */}
                            <div className={styles.searchContainer}>
                                <Search className={styles.searchIcon} />
                                <input
                                    type="text"
                                    placeholder="Buscar en tus tareas..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className={styles.searchInput}
                                />
                            </div>

                            {/* Filtros */}
                            <div className={styles.selectGroup}>
                                <div className={styles.selectContainer}>
                                    <Filter className={styles.selectIcon} />
                                    <select
                                        value={filter}
                                        onChange={(e) => setFilter(e.target.value)}
                                        className={styles.select}
                                    >
                                        <option value="all">Todas las tareas</option>
                                        <option value="pending">Pendientes</option>
                                        <option value="completed">Completadas</option>
                                        <option value="overdue">Vencidas</option>
                                    </select>
                                </div>

                                <div className={styles.selectContainer}>
                                    <Tag className={styles.selectIcon} />
                                    <select
                                        value={categoryFilter}
                                        onChange={(e) => setCategoryFilter(e.target.value)}
                                        className={styles.select}
                                    >
                                        <option value="">Todas las categorías</option>
                                        {categories.map(category => (
                                            <option key={category.id} value={category.id}>
                                                {category.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* Botón Nueva Tarea */}
                        <button
                            onClick={() => setShowTaskModal(true)}
                            className={styles.newTaskButton}
                        >
                            <Plus size={20} />
                            Nueva Tarea
                        </button>
                    </div>
                </div>

                {/* Lista de Tareas */}
                <div className={styles.taskList}>
                    {filteredTasks.length === 0 ? (
                        <div className={styles.emptyState}>
                            <div className={styles.emptyCard}>
                                <div className={styles.emptyIcon}>
                                    <Calendar size={40} color="#9ca3af" />
                                </div>
                                <h3 className={styles.emptyTitle}>
                                    {hasActiveFilters ? 'No se encontraron tareas' : '¡Tu espacio está limpio!'}
                                </h3>
                                <p className={styles.emptyMessage}>
                                    {hasActiveFilters
                                        ? 'Intenta ajustar los filtros de búsqueda'
                                        : 'Crea tu primera tarea y comienza a ser más productivo'
                                    }
                                </p>
                                {!hasActiveFilters && (
                                    <button
                                        onClick={() => setShowTaskModal(true)}
                                        className={styles.newTaskButton}
                                    >
                                        <Plus size={16} />
                                        Crear Primera Tarea
                                    </button>
                                )}
                            </div>
                        </div>
                    ) : (
                        filteredTasks.map(task => {
                            const category = categories.find(c => c.id === task.category);
                            const taskIsOverdue = isOverdue(task);

                            let cardClass = styles.taskCard;
                            if (task.done) {
                                cardClass += ` ${styles.taskCardCompleted}`;
                            } else if (taskIsOverdue) {
                                cardClass += ` ${styles.taskCardOverdue}`;
                            } else {
                                cardClass += ` ${styles.taskCardDefault}`;
                            }

                            return (
                                <div key={task.id} className={cardClass}>
                                    <div className={styles.taskCardContent}>
                                        <div className={styles.taskCardLeft}>
                                            <button
                                                onClick={() => handleToggleTask(task.id)}
                                                className={`${styles.toggleButton} ${
                                                    task.done ? styles.toggleButtonCompleted : styles.toggleButtonPending
                                                }`}
                                            >
                                                {task.done ? <CheckCircle2 size={24} /> : <Circle size={24} />}
                                            </button>

                                            <div className={styles.taskContent}>
                                                <h3 className={`${styles.taskTitle} ${task.done ? styles.taskTitleCompleted : ''}`}>
                                                    {task.title}
                                                </h3>

                                                {task.description && (
                                                    <p className={`${styles.taskDescription} ${task.done ? styles.taskDescriptionCompleted : ''}`}>
                                                        {task.description}
                                                    </p>
                                                )}

                                                <div className={styles.taskTags}>
                                                    {category && (
                                                        <div
                                                            className={styles.tag}
                                                            style={{
                                                                backgroundColor: `${category.color}15`,
                                                                borderColor: `${category.color}30`,
                                                                color: category.color
                                                            }}
                                                        >
                                                            <Tag size={16} />
                                                            {category.name}
                                                        </div>
                                                    )}

                                                    <div className={`${styles.tag} ${
                                                        task.priority === 'low' ? styles.priorityTagLow :
                                                            task.priority === 'medium' ? styles.priorityTagMedium :
                                                                styles.priorityTagHigh
                                                    }`}>
                                                        {task.priority === 'low' ? 'Baja' :
                                                            task.priority === 'medium' ? 'Media' : 'Alta'}
                                                    </div>

                                                    {task.due_date && (
                                                        <div className={`${styles.tag} ${
                                                            taskIsOverdue && !task.done ? styles.dateTagOverdue : styles.dateTag
                                                        }`}>
                                                            {taskIsOverdue && !task.done ? (
                                                                <AlertTriangle size={16} />
                                                            ) : (
                                                                <Calendar size={16} />
                                                            )}
                                                            {formatDate(task.due_date)}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        <div className={styles.taskActions}>
                                            <button
                                                onClick={() => {
                                                    setEditingTask(task);
                                                    setShowTaskModal(true);
                                                }}
                                                className={styles.actionButton}
                                            >
                                                <Edit3 size={20} />
                                            </button>
                                            <button
                                                onClick={() => handleDeleteTask(task.id)}
                                                className={`${styles.actionButton} ${styles.actionButtonDelete}`}
                                            >
                                                <Trash2 size={20} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    )}
                </div>

                {/* Modal con TaskForm real */}
                {showTaskModal && (
                    <div className={styles.modalOverlay} onClick={() => setShowTaskModal(false)}>
                        <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                            <div className={styles.modalHeader}>
                                <h2 className={styles.modalTitle}>
                                    {editingTask ? '✏️ Editar Tarea' : '✨ Nueva Tarea'}
                                </h2>
                                <button
                                    onClick={() => {
                                        setShowTaskModal(false);
                                        setEditingTask(null);
                                    }}
                                    className={styles.closeButton}
                                >
                                    <X size={24} />
                                </button>
                            </div>
                            <div className={styles.modalBody}>
                                <TaskForm
                                    task={editingTask}
                                    categories={categories}
                                    onSave={editingTask ? handleUpdateTask : handleCreateTask}
                                    onCancel={() => {
                                        setShowTaskModal(false);
                                        setEditingTask(null);
                                    }}
                                    isEditing={!!editingTask}
                                />
                            </div>
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
};

export default TaskManager;