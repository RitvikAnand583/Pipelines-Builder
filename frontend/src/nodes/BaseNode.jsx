import { Handle, Position, NodeResizer } from 'reactflow';
import { 
  Download, 
  Upload, 
  Bot, 
  FileText, 
  Globe, 
  GitBranch 
} from 'lucide-react';

// Icon mapping for node types
const nodeIcons = {
  input: Download,
  output: Upload,
  llm: Bot,
  text: FileText,
  api: Globe,
  conditional: GitBranch,
};

// Accent colors for different node types (dark mode)
const nodeAccentsDark = {
  input: {
    border: 'border-l-accent-blue/50',
    glow: 'hover:shadow-[0_0_12px_rgba(137,180,250,0.15)]',
    iconBg: 'bg-accent-blue/20',
    iconColor: 'text-accent-blue',
    handleColor: '#89b4fa',
  },
  output: {
    border: 'border-l-accent-green/50',
    glow: 'hover:shadow-[0_0_12px_rgba(166,227,161,0.15)]',
    iconBg: 'bg-accent-green/20',
    iconColor: 'text-accent-green',
    handleColor: '#a6e3a1',
  },
  llm: {
    border: 'border-l-accent-purple/50',
    glow: 'hover:shadow-[0_0_12px_rgba(203,166,247,0.15)]',
    iconBg: 'bg-accent-purple/20',
    iconColor: 'text-accent-purple',
    handleColor: '#cba6f7',
  },
  text: {
    border: 'border-l-accent-yellow/50',
    glow: 'hover:shadow-[0_0_12px_rgba(249,226,175,0.15)]',
    iconBg: 'bg-accent-yellow/20',
    iconColor: 'text-accent-yellow',
    handleColor: '#f9e2af',
  },
  api: {
    border: 'border-l-accent-orange/50',
    glow: 'hover:shadow-[0_0_12px_rgba(250,179,135,0.15)]',
    iconBg: 'bg-accent-orange/20',
    iconColor: 'text-accent-orange',
    handleColor: '#fab387',
  },
  conditional: {
    border: 'border-l-accent-red/50',
    glow: 'hover:shadow-[0_0_12px_rgba(243,139,168,0.15)]',
    iconBg: 'bg-accent-red/20',
    iconColor: 'text-accent-red',
    handleColor: '#f38ba8',
  },
  default: {
    border: 'border-l-dark-muted/50',
    glow: '',
    iconBg: 'bg-dark-muted/20',
    iconColor: 'text-dark-muted',
    handleColor: '#6c7086',
  },
};

// Accent colors for different node types (light mode)
const nodeAccentsLight = {
  input: {
    border: 'border-l-[#3b82f6]',
    glow: 'hover:shadow-[0_0_12px_rgba(59,130,246,0.2)]',
    iconBg: 'bg-blue-100',
    iconColor: 'text-blue-600',
    handleColor: '#3b82f6',
  },
  output: {
    border: 'border-l-[#22c55e]',
    glow: 'hover:shadow-[0_0_12px_rgba(34,197,94,0.2)]',
    iconBg: 'bg-green-100',
    iconColor: 'text-green-600',
    handleColor: '#22c55e',
  },
  llm: {
    border: 'border-l-[#8b5cf6]',
    glow: 'hover:shadow-[0_0_12px_rgba(139,92,246,0.2)]',
    iconBg: 'bg-purple-100',
    iconColor: 'text-purple-600',
    handleColor: '#8b5cf6',
  },
  text: {
    border: 'border-l-[#f59e0b]',
    glow: 'hover:shadow-[0_0_12px_rgba(245,158,11,0.2)]',
    iconBg: 'bg-amber-100',
    iconColor: 'text-amber-600',
    handleColor: '#f59e0b',
  },
  api: {
    border: 'border-l-[#f97316]',
    glow: 'hover:shadow-[0_0_12px_rgba(249,115,22,0.2)]',
    iconBg: 'bg-orange-100',
    iconColor: 'text-orange-600',
    handleColor: '#f97316',
  },
  conditional: {
    border: 'border-l-[#ef4444]',
    glow: 'hover:shadow-[0_0_12px_rgba(239,68,68,0.2)]',
    iconBg: 'bg-red-100',
    iconColor: 'text-red-600',
    handleColor: '#ef4444',
  },
  default: {
    border: 'border-l-light-muted',
    glow: '',
    iconBg: 'bg-gray-100',
    iconColor: 'text-gray-600',
    handleColor: '#8891a5',
  },
};

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

/**
 * NodeField - Form field wrapper
 */
export const NodeField = ({ label, children, isDark = true }) => (
  <div className="flex flex-col gap-1.5">
    {label && (
      <label className={`
        text-[10px] font-semibold uppercase tracking-wider
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
      w-full px-3 py-2 rounded-lg text-xs border outline-none
      transition-all duration-200
      ${isDark 
        ? 'bg-dark-bg border-dark-border text-dark-text placeholder-dark-muted focus:border-accent-blue focus:ring-1 focus:ring-accent-blue/30' 
        : 'bg-white border-gray-200 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30'}
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
      w-full px-3 py-2 rounded-lg text-xs border outline-none cursor-pointer
      transition-all duration-200 appearance-none
      bg-no-repeat bg-[length:12px] bg-[right_10px_center]
      ${isDark 
        ? 'bg-dark-bg border-dark-border text-dark-text focus:border-accent-blue focus:ring-1 focus:ring-accent-blue/30' 
        : 'bg-white border-gray-200 text-gray-900 focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30'}
    `}
    style={{
      backgroundImage: isDark 
        ? `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%236c7086' d='M6 8L2 4h8z'/%3E%3C/svg%3E")`
        : `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%236b7280' d='M6 8L2 4h8z'/%3E%3C/svg%3E")`
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
      w-full px-3 py-2 rounded-lg text-xs border outline-none resize-y min-h-[60px]
      transition-all duration-200
      ${isDark 
        ? 'bg-dark-bg border-dark-border text-dark-text placeholder-dark-muted focus:border-accent-blue focus:ring-1 focus:ring-accent-blue/30' 
        : 'bg-white border-gray-200 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30'}
    `}
  />
);

/**
 * NodeInfo - Info box
 */
export const NodeInfo = ({ children, isDark = true }) => (
  <div className={`
    p-2.5 rounded-lg text-[10px] leading-relaxed
    ${isDark 
      ? 'bg-dark-bg/50 text-dark-subtext border border-dark-border' 
      : 'bg-blue-50 text-gray-600 border border-blue-100'}
  `}>
    {children}
  </div>
);

export default BaseNode;
