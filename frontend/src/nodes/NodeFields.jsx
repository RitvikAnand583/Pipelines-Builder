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
