import { useStore } from '../store';
import { shallow } from 'zustand/shallow';

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
      flex items-center justify-center py-4 border-t
      ${isDark 
        ? 'bg-dark-surface border-dark-border' 
        : 'bg-light-surface border-light-border'}
    `}>
      <button
        onClick={handleSubmit}
        className={`
          px-8 py-2.5 rounded-lg font-semibold text-white
          transition-all duration-200 hover:scale-105 active:scale-95
          ${isDark 
            ? 'bg-accent-blue hover:bg-accent-purple' 
            : 'bg-accent-light-blue hover:bg-accent-light-purple'}
          shadow-lg hover:shadow-xl
        `}
      >
        Submit Pipeline
      </button>
    </div>
  );
};
