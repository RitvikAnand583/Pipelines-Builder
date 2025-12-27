import { 
  Download, 
  Upload, 
  Bot, 
  FileText, 
  Globe, 
  GitBranch,
  FileCode, 
  Puzzle,   
  GitMerge  
} from 'lucide-react';

const nodeIcons = {
  customInput: Download,
  customOutput: Upload,
  llm: Bot,
  text: FileText,
  api: Globe,
  conditional: GitBranch,
  transform: FileCode,
  integration: Puzzle,
  merge: GitMerge,
};

const nodeColors = {
  customInput: {
    dark: {
      border: 'hover:border-accent-blue',
      bg: 'hover:bg-accent-blue/10',
      icon: 'text-accent-blue',
    },
    light: {
      border: 'hover:border-blue-400',
      bg: 'hover:bg-blue-50',
      icon: 'text-blue-600',
    },
  },
  customOutput: {
    dark: {
      border: 'hover:border-accent-green',
      bg: 'hover:bg-accent-green/10',
      icon: 'text-accent-green',
    },
    light: {
      border: 'hover:border-green-400',
      bg: 'hover:bg-green-50',
      icon: 'text-green-600',
    },
  },
  llm: {
    dark: {
      border: 'hover:border-accent-purple',
      bg: 'hover:bg-accent-purple/10',
      icon: 'text-accent-purple',
    },
    light: {
      border: 'hover:border-purple-400',
      bg: 'hover:bg-purple-50',
      icon: 'text-purple-600',
    },
  },
  text: {
    dark: {
      border: 'hover:border-accent-yellow',
      bg: 'hover:bg-accent-yellow/10',
      icon: 'text-accent-yellow',
    },
    light: {
      border: 'hover:border-amber-400',
      bg: 'hover:bg-amber-50',
      icon: 'text-amber-600',
    },
  },
  api: {
    dark: {
      border: 'hover:border-accent-orange',
      bg: 'hover:bg-accent-orange/10',
      icon: 'text-accent-orange',
    },
    light: {
      border: 'hover:border-orange-400',
      bg: 'hover:bg-orange-50',
      icon: 'text-orange-600',
    },
  },
  conditional: {
    dark: {
      border: 'hover:border-accent-red',
      bg: 'hover:bg-accent-red/10',
      icon: 'text-accent-red',
    },
    light: {
      border: 'hover:border-red-400',
      bg: 'hover:bg-red-50',
      icon: 'text-red-600',
    },
  },
  transform: {
    dark: {
      border: 'hover:border-teal-400',
      bg: 'hover:bg-teal-400/10',
      icon: 'text-teal-400',
    },
    light: {
      border: 'hover:border-teal-500',
      bg: 'hover:bg-teal-50',
      icon: 'text-teal-600',
    },
  },
  integration: {
    dark: {
      border: 'hover:border-pink-400',
      bg: 'hover:bg-pink-400/10',
      icon: 'text-pink-400',
    },
    light: {
      border: 'hover:border-pink-500',
      bg: 'hover:bg-pink-50',
      icon: 'text-pink-600',
    },
  },
  merge: {
    dark: {
      border: 'hover:border-indigo-400',
      bg: 'hover:bg-indigo-400/10',
      icon: 'text-indigo-400',
    },
    light: {
      border: 'hover:border-indigo-500',
      bg: 'hover:bg-indigo-50',
      icon: 'text-indigo-600',
    },
  },
};

export const DraggableNode = ({ type, label, isDark }) => {
  const Icon = nodeIcons[type] || FileText;
  const colorSet = nodeColors[type] || nodeColors.text;
  const colors = isDark ? colorSet.dark : colorSet.light;

  const onDragStart = (event, nodeType) => {
    const appData = { nodeType };
    event.target.style.cursor = 'grabbing';
    event.dataTransfer.setData('application/reactflow', JSON.stringify(appData));
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div
      draggable
      onDragStart={(event) => onDragStart(event, type)}
      onDragEnd={(event) => (event.target.style.cursor = 'grab')}
      className={`
        flex items-center gap-2.5 px-4 py-2.5 rounded-xl cursor-grab
        transition-all duration-200 hover:-translate-y-1 hover:shadow-lg
        ${isDark 
          ? `bg-dark-overlay border border-dark-border ${colors.border} ${colors.bg}` 
          : `bg-white border border-gray-200 ${colors.border} ${colors.bg}`}
        active:cursor-grabbing active:scale-95
      `}
    >
      <Icon className={`w-4 h-4 ${colors.icon}`} />
      <span className={`text-sm font-medium ${isDark ? 'text-dark-text' : 'text-gray-800'}`}>
        {label}
      </span>
    </div>
  );
};

export default DraggableNode;