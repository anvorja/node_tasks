import {
  Briefcase,
  User,
  Heart,
  GraduationCap,
  DollarSign,
  Home,
  ShoppingCart,
  MoreHorizontal,
  Circle,
  Clock,
  AlertTriangle
} from 'lucide-react';

export const PRIORITY_CONFIG = {
  low: {
    label: 'Baja',
    color: 'emerald',
    bgColor: 'bg-emerald-50',
    textColor: 'text-emerald-700',
    borderColor: 'border-emerald-200',
    icon: Circle
  },
  medium: {
    label: 'Media',
    color: 'amber',
    bgColor: 'bg-amber-50',
    textColor: 'text-amber-700',
    borderColor: 'border-amber-200',
    icon: Clock
  },
  high: {
    label: 'Alta',
    color: 'red',
    bgColor: 'bg-red-50',
    textColor: 'text-red-700',
    borderColor: 'border-red-200',
    icon: AlertTriangle
  }
};

export const CATEGORY_ICONS = {
  'Trabajo': Briefcase,
  'Personal': User,
  'Salud': Heart,
  'Educacion': GraduationCap,
  'Finanzas': DollarSign,
  'Hogar': Home,
  'Compras': ShoppingCart,
  'Otro': MoreHorizontal
};

export const FILTER_OPTIONS = {
  all: 'Todas las tareas',
  pending: 'Pendientes',
  completed: 'Completadas',
  overdue: 'Vencidas'
};

export const TASK_FORM_INITIAL_STATE = {
  title: '',
  description: '',
  category: '',
  priority: 'medium',
  due_date: ''
};