import { Handle, Position, NodeResizer } from 'reactflow';
import { FileText } from 'lucide-react';
import { nodeIcons } from './nodeIcons';
import { nodeAccentsDark, nodeAccentsLight } from './nodeStyles';

/**
 * BaseNode - Reusable node wrapper component
 * @param {boolean} useMultipleHandles - If true, uses positioned handles (for conditional node)
 * @param {object} style - Custom inline styles for the node container
 */
export const BaseNode = ({
  id,
  title,
  type = 'default',
  inputs = [],
  outputs = [],
  children,
  isDark = true,
  useMultipleHandles = false,
  selected = false,
  style = {},
}) => {
  // Select accent colors based on theme
  const accents = isDark ? nodeAccentsDark : nodeAccentsLight;
  const accent = accents[type] || accents.default;
  const Icon = nodeIcons[type] || FileText;

  // Calculate handle position for multiple handles mode
  const getHandlePosition = (index, total) => {
    const offset = 100 / (total + 1);
    return `${offset * (index + 1)}%`;
  };

  return (
    <div
      className={`
        relative min-w-[240px] rounded-xl border
        transition-all duration-300 ease-out
        animate-node-enter
        ${accent.glow}
        ${isDark 
          ? 'bg-dark-surface border-dark-border shadow-node' 
          : 'bg-white border-light-border shadow-[0_2px_8px_rgba(0,0,0,0.08)]'}
      `}
      style={{ ...style, overflow: 'visible' }}
    >
      {/* Node Resizer */}
      <NodeResizer
        color={accent.handleColor}
        isVisible={selected}
        minWidth={200}
        minHeight={100}
        handleStyle={{
          width: 10,
          height: 10,
          borderRadius: '50%',
        }}
        lineStyle={{
          borderWidth: 1,
          borderColor: accent.handleColor,
        }}
      />

      {/* Input Handles */}
      {useMultipleHandles ? (
        // Multiple positioned handles (for conditional node)
        inputs.map((input, index) => (
          <Handle
            key={`input-${input.id}`}
            type="target"
            position={Position.Left}
            id={input.id}
            style={{ 
              top: getHandlePosition(index, inputs.length),
              transform: 'translateY(-50%)',
              width: 12,
              height: 12,
              background: isDark ? '#89b4fa' : '#3b82f6',
              border: `2px solid ${isDark ? '#1e1e2e' : '#ffffff'}`,
            }}
          />
        ))
      ) : (
        // Single centered handle
        inputs.length > 0 && (
          <Handle
            type="target"
            position={Position.Left}
            id={inputs[0]?.id || 'input'}
            style={{ 
              width: 12,
              height: 12,
              background: isDark ? '#89b4fa' : '#3b82f6',
              border: `2px solid ${isDark ? '#1e1e2e' : '#ffffff'}`,
            }}
          />
        )
      )}

      {/* Header */}
      <div
        className={`
          flex items-center gap-2.5 px-3 py-3 rounded-t-xl border-b border-l-[3px]
          ${accent.border}
          ${isDark 
            ? 'bg-dark-overlay/50 border-dark-border' 
            : 'bg-gray-50 border-light-border'}
        `}
      >
        <div className={`p-1.5 rounded-lg ${accent.iconBg}`}>
          <Icon className={`w-4 h-4 ${accent.iconColor}`} />
        </div>
        <span className={`font-semibold text-sm ${isDark ? 'text-dark-text' : 'text-light-text'}`}>
          {title}
        </span>
      </div>

      {/* Handle Labels - Left (only for multiple handles mode) */}
      {useMultipleHandles && inputs.length > 0 && (
        <div className="absolute left-3 top-0 bottom-0 pointer-events-none">
          {inputs.map((input, index) => (
            input.label && (
              <span
                key={`label-${input.id}`}
                className={`
                  absolute text-[9px] font-medium -translate-y-1/2 pl-1
                  ${isDark ? 'text-dark-muted' : 'text-light-muted'}
                `}
                style={{ top: getHandlePosition(index, inputs.length) }}
              >
                {input.label}
              </span>
            )
          ))}
        </div>
      )}

      {/* Body */}
      <div className="p-3 flex flex-col gap-3">
        {children}
      </div>

      {/* Handle Labels - Right (only for multiple handles mode) */}
      {useMultipleHandles && outputs.length > 0 && (
        <div className="absolute right-3 top-0 bottom-0 pointer-events-none">
          {outputs.map((output, index) => (
            output.label && (
              <span
                key={`label-${output.id}`}
                className={`
                  absolute right-0 text-[9px] font-medium -translate-y-1/2 pr-1
                  ${isDark ? 'text-dark-muted' : 'text-light-muted'}
                `}
                style={{ top: getHandlePosition(index, outputs.length) }}
              >
                {output.label}
              </span>
            )
          ))}
        </div>
      )}

      {/* Output Handles */}
      {useMultipleHandles ? (
        // Multiple positioned handles (for conditional node)
        outputs.map((output, index) => {
          // Custom colors for conditional outputs
          let handleBg = isDark ? '#a6e3a1' : '#22c55e';
          if (output.color === 'green') {
            handleBg = isDark ? '#a6e3a1' : '#22c55e';
          } else if (output.color === 'red') {
            handleBg = isDark ? '#f38ba8' : '#ef4444';
          }
          return (
            <Handle
              key={`output-${output.id}`}
              type="source"
              position={Position.Right}
              id={output.id}
              style={{ 
                top: getHandlePosition(index, outputs.length),
                transform: 'translateY(-50%)',
                width: 12,
                height: 12,
                background: handleBg,
                border: `2px solid ${isDark ? '#1e1e2e' : '#ffffff'}`,
              }}
            />
          );
        })
      ) : (
        // Single centered handle
        outputs.length > 0 && (
          <Handle
            type="source"
            position={Position.Right}
            id={outputs[0]?.id || 'output'}
            style={{ 
              width: 12,
              height: 12,
              background: isDark ? '#a6e3a1' : '#22c55e',
              border: `2px solid ${isDark ? '#1e1e2e' : '#ffffff'}`,
            }}
          />
        )
      )}
    </div>
  );
};

export { NodeField, NodeInput, NodeSelect, NodeTextArea, NodeInfo } from './NodeFields';
export default BaseNode;
