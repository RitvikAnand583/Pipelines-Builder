import { useState } from 'react';
import { useStore } from '../store';
import { shallow } from 'zustand/shallow';
import { Send, Sparkles, Layers, Loader2, CheckCircle2, XCircle, X } from 'lucide-react';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
});

export const SubmitButton = ({ isDark }) => {
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
          disabled={nodes.length === 0 || isLoading || true}
          className={`
            flex items-center gap-2 px-6 py-2.5 rounded-xl font-semibold text-sm
            transition-all duration-300 
            ${nodes.length === 0 || isLoading
              ? 'opacity-50 cursor-not-allowed' 
              : 'hover:scale-[1.02] hover:shadow-xl active:scale-[0.98]'}
            ${isDark 
              ? 'bg-purple-600 hover:bg-purple-500 text-white shadow-lg shadow-purple-600/25' 
              : 'bg-purple-700 hover:bg-purple-800 text-white shadow-lg shadow-purple-700/30'}
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
