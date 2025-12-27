import { getBezierPath } from 'reactflow';

const SmoothEdge = ({ 
  id, 
  sourceX, 
  sourceY, 
  targetX, 
  targetY, 
  sourcePosition, 
  targetPosition, 
  style, 
  markerEnd, 
  selected,
  animated 
}) => {
  const [edgePath] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  const strokeColor = style?.stroke || '#89b4fa';

  return (
    <>
      {/* Subtle glow layer */}
      <path
        d={edgePath}
        fill="none"
        stroke={strokeColor}
        strokeWidth={selected ? 6 : 4}
        strokeOpacity={0.15}
        strokeLinecap="round"
      />
      {/* Main edge */}
      <path
        d={edgePath}
        fill="none"
        stroke={strokeColor}
        strokeWidth={selected ? 2.5 : 2}
        strokeLinecap="round"
        style={{
          filter: selected ? `drop-shadow(0 0 4px ${strokeColor})` : 'none',
        }}
      />
    </>
  );
};

export default SmoothEdge;
