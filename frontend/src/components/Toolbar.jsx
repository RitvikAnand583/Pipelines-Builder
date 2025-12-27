import { useState } from 'react';
import { DraggableNode } from './DraggableNode';
import { nodeConfig } from '../nodes';
import { useStore } from '../store';
import { shallow } from 'zustand/shallow';
import { SunMedium, MoonStar, Workflow, Send, Loader2, CheckCircle2, XCircle, X } from 'lucide-react';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
});

export const PipelineToolbar = ({ isDark, toggleTheme }) => {
  const { nodes, edges } = useStore(selector, shallow);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async () => {
    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch(`${API_BASE_URL}/pipelines/parse`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nodes, edges }),
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError(err.message || 'Failed to connect to server');
    } finally {
      setIsLoading(false);
    }
  };

  const closeModal = () => {
    setResult(null);
    setError(null);
  };

  return (
    <>
      <div className={`
        px-6 py-4 border-b
        ${isDark 
          ? 'bg-dark-surface/95 border-dark-border backdrop-blur-sm shadow-lg' 
          : 'bg-white border-gray-200 shadow-sm'}
      `}>
        {/* Row 1: Header + Stats + Theme Toggle */}
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
          <div className="flex items-center gap-4">
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
                ? <SunMedium className="w-5 h-5 text-accent-yellow" /> 
                : <MoonStar className="w-5 h-5 text-blue-600" />
              }
            </button>
          </div>
        </div>

        {/* Divider */}
        <div className={`h-px mb-4 ${isDark ? 'bg-dark-border' : 'bg-gray-200'}`} />

        {/* Row 2: Nodes + Submit */}
        <div className="flex items-center justify-between">
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

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            disabled={nodes.length === 0 || isLoading}
            className={`
              flex items-center gap-2 px-4 py-2 rounded-xl font-medium text-sm ml-4
              transition-all duration-300 border
              ${nodes.length === 0 || isLoading
                ? 'opacity-50 cursor-not-allowed' 
                : 'hover:scale-105 active:scale-95'}
              ${isDark 
                ? 'bg-dark-overlay border-dark-border text-accent-purple hover:border-accent-purple hover:bg-accent-purple/10' 
                : 'bg-gray-50 border-gray-200 text-purple-600 hover:border-purple-400 hover:bg-purple-50'}
            `}
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Analyzing...
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                Submit
              </>
            )}
          </button>
        </div>
      </div>

      {/* Result Modal */}
      {(result || error) && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
          onClick={closeModal}
        >
          <div 
            className={`
              relative w-full max-w-md mx-4 p-6 rounded-2xl shadow-2xl
              animate-in fade-in zoom-in-95 duration-200
              ${isDark ? 'bg-dark-surface border border-dark-border' : 'bg-white border border-gray-200'}
            `}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={closeModal}
              className={`
                absolute top-4 right-4 p-1 rounded-lg transition-colors
                ${isDark ? 'hover:bg-dark-hover text-dark-muted' : 'hover:bg-gray-100 text-gray-400'}
              `}
            >
              <X className="w-5 h-5" />
            </button>

            {error ? (
              // Error State
              <div className="text-center">
                <div className={`
                  inline-flex items-center justify-center w-16 h-16 rounded-full mb-4
                  ${isDark ? 'bg-red-500/20' : 'bg-red-100'}
                `}>
                  <XCircle className={`w-8 h-8 ${isDark ? 'text-red-400' : 'text-red-500'}`} />
                </div>
                <h3 className={`text-lg font-semibold mb-2 ${isDark ? 'text-dark-text' : 'text-gray-900'}`}>
                  Connection Error
                </h3>
                <p className={`text-sm ${isDark ? 'text-dark-subtext' : 'text-gray-600'}`}>
                  {error}
                </p>
                <p className={`text-xs mt-2 ${isDark ? 'text-dark-muted' : 'text-gray-400'}`}>
                  Make sure the backend server is running on port 8000
                </p>
              </div>
            ) : result && (
              // Success State
              <div className="text-center">
                <div className={`
                  inline-flex items-center justify-center w-16 h-16 rounded-full mb-4
                  ${result.is_dag 
                    ? isDark ? 'bg-green-500/20' : 'bg-green-100'
                    : isDark ? 'bg-amber-500/20' : 'bg-amber-100'}
                `}>
                  {result.is_dag ? (
                    <CheckCircle2 className={`w-8 h-8 ${isDark ? 'text-green-400' : 'text-green-500'}`} />
                  ) : (
                    <XCircle className={`w-8 h-8 ${isDark ? 'text-amber-400' : 'text-amber-500'}`} />
                  )}
                </div>
                
                <h3 className={`text-lg font-semibold mb-2 ${isDark ? 'text-dark-text' : 'text-gray-900'}`}>
                  {result.is_dag ? 'Valid Pipeline!' : 'Cycle Detected'}
                </h3>
                
                <p className={`text-sm mb-4 ${isDark ? 'text-dark-subtext' : 'text-gray-600'}`}>
                  {result.message}
                </p>

                {/* Stats */}
                <div className={`
                  flex justify-center gap-8 py-4 rounded-xl
                  ${isDark ? 'bg-dark-bg' : 'bg-gray-50'}
                `}>
                  <div className="text-center">
                    <div className={`text-2xl font-bold ${isDark ? 'text-accent-blue' : 'text-blue-600'}`}>
                      {result.num_nodes}
                    </div>
                    <div className={`text-xs ${isDark ? 'text-dark-muted' : 'text-gray-500'}`}>
                      Nodes
                    </div>
                  </div>
                  <div className={`w-px ${isDark ? 'bg-dark-border' : 'bg-gray-200'}`} />
                  <div className="text-center">
                    <div className={`text-2xl font-bold ${isDark ? 'text-accent-purple' : 'text-purple-600'}`}>
                      {result.num_edges}
                    </div>
                    <div className={`text-xs ${isDark ? 'text-dark-muted' : 'text-gray-500'}`}>
                      Edges
                    </div>
                  </div>
                  <div className={`w-px ${isDark ? 'bg-dark-border' : 'bg-gray-200'}`} />
                  <div className="text-center">
                    <div className={`text-2xl font-bold ${result.is_dag 
                      ? isDark ? 'text-accent-green' : 'text-green-600'
                      : isDark ? 'text-accent-red' : 'text-red-600'}`}>
                      {result.is_dag ? 'Yes' : 'No'}
                    </div>
                    <div className={`text-xs ${isDark ? 'text-dark-muted' : 'text-gray-500'}`}>
                      Is DAG
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};
