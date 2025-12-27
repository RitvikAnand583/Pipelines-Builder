import { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { BaseNode, NodeField } from './BaseNode';

export const TextNode = ({ id, data, selected }) => {
  const [text, setText] = useState(data?.text || '');
  const [dimensions, setDimensions] = useState({ width: 280, height: 120 });
  const [activeHandles, setActiveHandles] = useState(new Set()); // Track which handles are active
  const textareaRef = useRef(null);
  const measureRef = useRef(null);
  const isDark = data?.isDark ?? true;

  // Extract variables from text using {{variableName}} pattern
  const variables = useMemo(() => {
    const regex = /\{\{(\w+)\}\}/g;
    const matches = text.match(regex);
    if (!matches) return [];
    
    // Extract unique variable names (remove {{ and }})
    const uniqueVars = [...new Set(matches.map(v => v.slice(2, -2)))];
    return uniqueVars;
  }, [text]);

  // Clean up activeHandles when variables change (remove handles for deleted variables)
  useEffect(() => {
    setActiveHandles(prev => {
      const newSet = new Set([...prev].filter(h => variables.includes(h)));
      return newSet.size !== prev.size ? newSet : prev;
    });
  }, [variables]);

  // Toggle handle visibility for a variable
  const toggleHandle = (varName) => {
    setActiveHandles(prev => {
      const newSet = new Set(prev);
      if (newSet.has(varName)) {
        newSet.delete(varName);
      } else {
        newSet.add(varName);
      }
      return newSet;
    });
  };

  // Create dynamic input handles only for active variables
  const dynamicInputs = useMemo(() => {
    return variables
      .filter(varName => activeHandles.has(varName))
      .map(varName => ({
        id: varName,
        label: varName
      }));
  }, [variables, activeHandles]);

  // Calculate dimensions based on text content
  const calculateDimensions = useCallback(() => {
    if (!measureRef.current) return;

    const measure = measureRef.current;
    measure.textContent = text || 'placeholder';

    // Get the natural size of the content
    const contentWidth = measure.scrollWidth;
    const contentHeight = measure.scrollHeight;

    // Apply constraints
    const minWidth = 200;
    const maxWidth = 500;
    const minHeight = 80;
    const maxHeight = 300;

    // Add padding for the textarea
    const paddedWidth = Math.max(minWidth, Math.min(maxWidth, contentWidth + 40));
    const paddedHeight = Math.max(minHeight, Math.min(maxHeight, contentHeight + 24));

    setDimensions({ width: paddedWidth, height: paddedHeight });
  }, [text]);

  // Recalculate on text change
  useEffect(() => {
    calculateDimensions();
  }, [text, calculateDimensions]);

  // Handle text change
  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  return (
    <BaseNode
      id={id}
      title="Text"
      type="text"
      inputs={dynamicInputs}
      outputs={[{ id: 'output', label: 'Text' }]}
      isDark={isDark}
      selected={selected}
      style={{ width: dimensions.width }}
      useMultipleHandles={variables.length > 1}
    >
      <NodeField label="Content" isDark={isDark}>
        {/* Hidden measure element */}
        <div
          ref={measureRef}
          className="absolute invisible whitespace-pre-wrap text-xs px-3 py-2"
          style={{ 
            width: 'auto',
            minWidth: 160,
            maxWidth: 460,
            wordBreak: 'break-word'
          }}
          aria-hidden="true"
        />
        
        {/* Actual textarea */}
        <textarea
          ref={textareaRef}
          value={text}
          onChange={handleTextChange}
          placeholder="Enter your text here... Use {{variable}} for dynamic values"
          className={`
            w-full px-3 py-2 rounded-lg text-xs border outline-none resize-none
            transition-all duration-200 overflow-hidden
            ${isDark 
              ? 'bg-dark-bg border-dark-border text-dark-text placeholder-dark-muted focus:border-accent-blue focus:ring-1 focus:ring-accent-blue/30' 
              : 'bg-white border-gray-200 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30'}
          `}
          style={{ 
            height: dimensions.height - 40,
            minHeight: 60
          }}
        />
      </NodeField>

      {/* Display detected variables - click to toggle handles */}
      {variables.length > 0 && (
        <div className="flex items-center gap-2 flex-wrap mt-1">
          <span className={`
            text-[9px] font-medium uppercase tracking-wide
            ${isDark ? 'text-dark-muted' : 'text-gray-400'}
          `}>
            Inputs:
          </span>
          {variables.map((varName) => {
            const isActive = activeHandles.has(varName);
            return (
              <button
                key={varName}
                onClick={() => toggleHandle(varName)}
                className={`
                  px-1.5 py-0.5 rounded text-[10px] font-medium cursor-pointer
                  transition-all duration-200 border
                  ${isActive
                    ? isDark 
                      ? 'bg-accent-yellow/30 text-accent-yellow border-accent-yellow/50 shadow-[0_0_8px_rgba(249,226,175,0.3)]' 
                      : 'bg-amber-100 text-amber-700 border-amber-300 shadow-[0_0_8px_rgba(245,158,11,0.3)]'
                    : isDark 
                      ? 'bg-accent-yellow/10 text-accent-yellow/70 border-transparent hover:bg-accent-yellow/20' 
                      : 'bg-amber-50 text-amber-500 border-transparent hover:bg-amber-100'}
                `}
              >
                {varName}
              </button>
            );
          })}
        </div>
      )}
    </BaseNode>
  );
};

export default TextNode;
