import { DraggableNode } from './DraggableNode';
import { nodeConfig } from '../nodes';

export const PipelineToolbar = ({ isDark, toggleTheme }) => {
  return (
    <div className={`
      px-6 py-4 border-b
      ${isDark 
        ? 'bg-gradient-to-r from-dark-surface to-dark-overlay border-dark-border' 
        : 'bg-gradient-to-r from-light-surface to-light-overlay border-light-border'}
      shadow-lg
    `}>
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <div>
          <h1 className={`text-xl font-bold ${isDark ? 'text-dark-text' : 'text-light-text'}`}>
            🔧 Pipeline Builder
          </h1>
          <p className={`text-sm ${isDark ? 'text-dark-subtext' : 'text-light-subtext'}`}>
            Drag nodes to canvas
          </p>
        </div>
        
        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className={`
            w-10 h-10 rounded-lg flex items-center justify-center text-xl
            transition-all duration-200 hover:scale-105 active:scale-95
            ${isDark 
              ? 'bg-dark-hover border border-dark-border hover:border-accent-blue' 
              : 'bg-light-hover border border-light-border hover:border-accent-light-blue'}
          `}
          title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        >
          {isDark ? '☀️' : '🌙'}
        </button>
      </div>

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
