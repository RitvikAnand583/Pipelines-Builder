const nodeTypeColors = {
  customInput: 'hover:border-accent-blue',
  customOutput: 'hover:border-accent-green',
  llm: 'hover:border-accent-purple',
  text: 'hover:border-accent-yellow',
  api: 'hover:border-accent-orange',
  conditional: 'hover:border-accent-red',
};

export const DraggableNode = ({ type, label, icon, isDark }) => {
  const onDragStart = (event, nodeType) => {
    const appData = { nodeType };
    event.target.style.cursor = 'grabbing';
    event.dataTransfer.setData('application/reactflow', JSON.stringify(appData));
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div
      draggable
      onDragStart={(event) => onDragStart(event, type)}
      onDragEnd={(event) => (event.target.style.cursor = 'grab')}
      className={`
        flex items-center gap-2 px-4 py-2.5 rounded-lg cursor-grab
        transition-all duration-200 hover:-translate-y-0.5
        ${isDark 
          ? `bg-dark-hover border border-dark-border ${nodeTypeColors[type]}` 
          : `bg-light-hover border border-light-border`}
        hover:shadow-lg active:cursor-grabbing
      `}
    >
      <span className="text-lg">{icon}</span>
      <span className={`text-sm font-medium ${isDark ? 'text-dark-text' : 'text-light-text'}`}>
        {label}
      </span>
    </div>
  );
};
