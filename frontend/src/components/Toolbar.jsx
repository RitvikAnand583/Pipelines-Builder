import { DraggableNode } from './DraggableNode';
import { nodeConfig } from '../nodes';
import { Sun, Moon, Workflow } from 'lucide-react';

export const PipelineToolbar = ({ isDark, toggleTheme }) => {
  return (
    <div className={`
      px-6 py-4 border-b
      ${isDark 
        ? 'bg-dark-surface/95 border-dark-border backdrop-blur-sm shadow-lg' 
        : 'bg-white border-gray-200 shadow-sm'}
    `}>
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-3">
          {/* Logo */}
          <div className={`
            p-2 rounded-xl
            ${isDark ? 'bg-accent-purple/20' : 'bg-purple-100'}
          `}>
            <Workflow className={`w-6 h-6 ${isDark ? 'text-accent-purple' : 'text-purple-600'}`} />
          </div>
          <div>
            <h1 className={`text-lg font-bold ${isDark ? 'text-dark-text' : 'text-gray-900'}`}>
              Pipeline Builder
            </h1>
            <p className={`text-xs ${isDark ? 'text-dark-subtext' : 'text-gray-500'}`}>
              Drag and drop nodes to create workflows
            </p>
          </div>
        </div>
        
        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className={`
            w-10 h-10 rounded-xl flex items-center justify-center
            transition-all duration-300 hover:scale-110 active:scale-95
            ${isDark 
              ? 'bg-dark-overlay border border-dark-border hover:border-accent-yellow hover:bg-accent-yellow/10' 
              : 'bg-gray-100 border border-gray-200 hover:border-blue-400 hover:bg-blue-50'}
          `}
          title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        >
          {isDark 
            ? <Sun className="w-5 h-5 text-accent-yellow" /> 
            : <Moon className="w-5 h-5 text-blue-600" />
          }
        </button>
      </div>

      {/* Divider */}
      <div className={`h-px mb-4 ${isDark ? 'bg-dark-border' : 'bg-gray-200'}`} />

      {/* Nodes */}
      <div className="flex flex-wrap gap-3">
        {nodeConfig.map((node) => (
          <DraggableNode
            key={node.type}
            type={node.type}
            label={node.label}
            icon={node.icon}
            isDark={isDark}
          />
        ))}
      </div>
    </div>
  );
};
