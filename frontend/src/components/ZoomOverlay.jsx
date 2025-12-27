const ZoomOverlay = ({ zoom, isDark }) => (
  <div className="absolute top-4 left-4 z-20 flex items-center">
    <span className={`px-2 py-1 rounded text-xs font-mono border ${isDark ? 'bg-dark-overlay border-dark-border text-dark-muted' : 'bg-white border-gray-200 text-gray-500'}`}>
      {Math.round(zoom * 100)}%
    </span>
  </div>
);

export default ZoomOverlay;
