// BaseNode.jsx - Core abstraction for all pipeline nodes with Tailwind CSS

import { Handle, Position } from 'reactflow';

// Accent colors for different node types
const nodeAccents = {
  input: {
    border: 'border-l-accent-blue',
    hoverBorder: 'hover:border-accent-blue',
  },
  output: {
    border: 'border-l-accent-green',
    hoverBorder: 'hover:border-accent-green',
  },
  llm: {
    border: 'border-l-accent-purple',
    hoverBorder: 'hover:border-accent-purple',
  },
  text: {
    border: 'border-l-accent-yellow',
    hoverBorder: 'hover:border-accent-yellow',
  },
  api: {
    border: 'border-l-accent-orange',
    hoverBorder: 'hover:border-accent-orange',
  },
  conditional: {
    border: 'border-l-accent-red',
    hoverBorder: 'hover:border-accent-red',
  },
  default: {
    border: 'border-l-dark-muted',
    hoverBorder: 'hover:border-dark-muted',
  },
};

/**
 * BaseNode - Reusable node wrapper component
 */
export const BaseNode = ({
  id,
  title,
  icon,
  type = 'default',
  inputs = [],
  outputs = [],
  children,
  isDark = true,
}) => {
  const accent = nodeAccents[type] || nodeAccents.default;

  const getHandlePosition = (index, total) => {
    const offset = 100 / (total + 1);
    return `${offset * (index + 1)}%`;
  };

  return (
    <div
      className={`
        relative min-w-[220px] rounded-lg border shadow-node
        transition-all duration-200 ${accent.hoverBorder}
        ${isDark 
          ? 'bg-dark-surface border-dark-border' 
          : 'bg-light-surface border-light-border'}
      `}
    >
      {/* Input Handles */}
      {inputs.map((input, index) => (
        <Handle
          key={`input-${input.id}`}
          type="target"
          position={Position.Left}
          id={`${id}-${input.id}`}
          className="!w-3 !h-3 !bg-accent-blue !border-2 !border-dark-surface !rounded-full"
          style={{ top: getHandlePosition(index, inputs.length) }}
        />
      ))}

      {/* Header */}
      <div
        className={`
          flex items-center gap-2 px-3 py-2.5 rounded-t-lg border-b border-l-[3px]
          ${accent.border}
          ${isDark 
            ? 'bg-dark-overlay border-dark-border' 
            : 'bg-light-overlay border-light-border'}
        `}
      >
        {icon && <span className="text-base">{icon}</span>}
        <span className={`font-semibold text-sm ${isDark ? 'text-dark-text' : 'text-light-text'}`}>
          {title}
        </span>
      </div>

      {/* Handle Labels - Left */}
      {inputs.length > 0 && (
        <div className="absolute left-2 top-0 bottom-0 pointer-events-none">
          {inputs.map((input, index) => (
            input.label && (
              <span
                key={`label-${input.id}`}
                className={`
                  absolute text-[10px] -translate-y-1/2
                  ${isDark ? 'text-dark-subtext' : 'text-light-subtext'}
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
      <div className="p-3 flex flex-col gap-2.5">
        {children}
      </div>

      {/* Handle Labels - Right */}
      {outputs.length > 0 && (
        <div className="absolute right-2 top-0 bottom-0 pointer-events-none">
          {outputs.map((output, index) => (
            output.label && (
              <span
                key={`label-${output.id}`}
                className={`
                  absolute right-0 text-[10px] -translate-y-1/2
                  ${isDark ? 'text-dark-subtext' : 'text-light-subtext'}
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
      {outputs.map((output, index) => (
        <Handle
          key={`output-${output.id}`}
          type="source"
          position={Position.Right}
          id={`${id}-${output.id}`}
          className="!w-3 !h-3 !bg-accent-green !border-2 !border-dark-surface !rounded-full"
          style={{ top: getHandlePosition(index, outputs.length) }}
        />
      ))}
    </div>
  );
};

/**
 * NodeField - Form field wrapper
 */
export const NodeField = ({ label, children, isDark = true }) => (
  <div className="flex flex-col gap-1">
    {label && (
      <label className={`
        text-[10px] font-medium uppercase tracking-wide
        ${isDark ? 'text-dark-subtext' : 'text-light-subtext'}
      `}>
        {label}
      </label>
    )}
    {children}
  </div>
);

/**
 * NodeInput - Styled text input
 */
export const NodeInput = ({ value, onChange, placeholder = '', isDark = true }) => (
  <input
    type="text"
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    className={`
      w-full px-2.5 py-2 rounded text-xs border outline-none
      transition-colors duration-200
      ${isDark 
        ? 'bg-dark-overlay border-dark-border text-dark-text placeholder-dark-muted focus:border-accent-blue' 
        : 'bg-light-overlay border-light-border text-light-text placeholder-light-muted focus:border-accent-light-blue'}
    `}
  />
);

/**
 * NodeSelect - Styled dropdown
 */
export const NodeSelect = ({ value, onChange, options = [], isDark = true }) => (
  <select
    value={value}
    onChange={onChange}
    className={`
      w-full px-2.5 py-2 rounded text-xs border outline-none cursor-pointer
      transition-colors duration-200 appearance-none
      bg-no-repeat bg-[length:12px] bg-[right_8px_center]
      ${isDark 
        ? 'bg-dark-overlay border-dark-border text-dark-text focus:border-accent-blue' 
        : 'bg-light-overlay border-light-border text-light-text focus:border-accent-light-blue'}
    `}
    style={{
      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%236c7086' d='M6 8L2 4h8z'/%3E%3C/svg%3E")`
    }}
  >
    {options.map((opt) => (
      <option key={opt.value} value={opt.value}>
        {opt.label}
      </option>
    ))}
  </select>
);

/**
 * NodeTextArea - Styled textarea
 */
export const NodeTextArea = ({ value, onChange, placeholder = '', rows = 3, isDark = true }) => (
  <textarea
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    rows={rows}
    className={`
      w-full px-2.5 py-2 rounded text-xs border outline-none resize-y min-h-[60px]
      transition-colors duration-200
      ${isDark 
        ? 'bg-dark-overlay border-dark-border text-dark-text placeholder-dark-muted focus:border-accent-blue' 
        : 'bg-light-overlay border-light-border text-light-text placeholder-light-muted focus:border-accent-light-blue'}
    `}
  />
);

/**
 * NodeInfo - Info box
 */
export const NodeInfo = ({ children, isDark = true }) => (
  <div className={`
    p-2 rounded text-[10px]
    ${isDark 
      ? 'bg-accent-blue/10 text-dark-subtext' 
      : 'bg-accent-light-blue/10 text-light-subtext'}
  `}>
    {children}
  </div>
);

export default BaseNode;
