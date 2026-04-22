import ClassicTemplate from './ClassicTemplate';
import ModernTemplate from './ModernTemplate';
import CreativeTemplate from './CreativeTemplate';
import ExecutiveTemplate from './ExecutiveTemplate';
import TechTemplate from './TechTemplate';

export interface Template {
  id: string;
  name: string;
  description: string;
  component: React.ComponentType<{ data: any }>;
  thumbnail: string;
  color: string;
}

export const templates: Template[] = [
  {
    id: 'classic',
    name: 'Classic Professional',
    description: 'Traditional format perfect for corporate roles',
    component: ClassicTemplate,
    thumbnail: '📄',
    color: 'from-blue-500 to-blue-600'
  },
  {
    id: 'modern',
    name: 'Modern Minimal',
    description: 'Clean design with sidebar layout',
    component: ModernTemplate,
    thumbnail: '✨',
    color: 'from-slate-700 to-slate-900'
  },
  {
    id: 'creative',
    name: 'Creative Bold',
    description: 'Eye-catching design for creative fields',
    component: CreativeTemplate,
    thumbnail: '🎨',
    color: 'from-purple-500 to-blue-500'
  },
  {
    id: 'executive',
    name: 'Executive Professional',
    description: 'Elegant design for senior positions',
    component: ExecutiveTemplate,
    thumbnail: '👔',
    color: 'from-emerald-600 to-emerald-700'
  },
  {
    id: 'tech',
    name: 'Tech Minimalist',
    description: 'Terminal-style for tech professionals',
    component: TechTemplate,
    thumbnail: '💻',
    color: 'from-emerald-400 to-emerald-600'
  }
];

export const getTemplateById = (id: string) => {
  return templates.find(t => t.id === id) || templates[0];
};
