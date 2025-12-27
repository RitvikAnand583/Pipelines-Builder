import { useStore } from '../store';
import { shallow } from 'zustand/shallow';
import { Send, Sparkles, Layers } from 'lucide-react';

const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
});

export const SubmitButton = ({ isDark }) => {
  const { nodes, edges } = useStore(selector, shallow);

  const handleSubmit = () => {
    console.log('Nodes:', nodes);
    console.log('Edges:', edges);
    alert(`Pipeline has ${nodes.length} nodes and ${edges.length} edges`);
  };

  return (
    <div className={`
      flex items-center justify-between px-6 py-4 border-t backdrop-blur-sm
      ${isDark 
        ? 'bg-dark-surface/80 border-dark-border' 
        : 'bg-light-surface/80 border-light-border'}
    `}>
      {/* Pipeline Stats */}
      <div className="flex items-center gap-6">
        <div className={`
          flex items-center gap-2 text-sm
          ${isDark ? 'text-dark-subtext' : 'text-light-subtext'}
        `}>
          <Layers className="w-4 h-4" />
          <span className="font-medium">{nodes.length}</span>
          <span className="opacity-70">nodes</span>
        </div>
        <div className={`
          flex items-center gap-2 text-sm
          ${isDark ? 'text-dark-subtext' : 'text-light-subtext'}
        `}>
          <Sparkles className="w-4 h-4" />
          <span className="font-medium">{edges.length}</span>
          <span className="opacity-70">connections</span>
        </div>
      </div>

      {/* Submit Button */}
      <button
        onClick={handleSubmit}
        disabled={nodes.length === 0}
        className={`
          flex items-center gap-2 px-6 py-2.5 rounded-xl font-semibold text-sm
          transition-all duration-300 
          ${nodes.length === 0 
            ? 'opacity-50 cursor-not-allowed' 
            : 'hover:scale-[1.02] hover:shadow-xl active:scale-[0.98]'}
          ${isDark 
            ? 'bg-purple-600 hover:bg-purple-500 text-white shadow-lg shadow-purple-600/25' 
            : 'bg-purple-700 hover:bg-purple-800 text-white shadow-lg shadow-purple-700/30'}
        `}
      >
        <Send className="w-4 h-4" />
        Submit
      </button>
    </div>
  );
};
