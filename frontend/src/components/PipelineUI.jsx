import { useState, useRef, useCallback } from 'react';
import ReactFlow, { Controls, Background, MiniMap, getBezierPath, BaseEdge } from 'reactflow';
import { useStore } from '../store';
import { shallow } from 'zustand/shallow';
import { nodeTypes } from '../nodes';
import { Grid3X3 } from 'lucide-react';

import 'reactflow/dist/style.css';

const gridSize = 20;
const proOptions = { hideAttribution: true };

const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
  getNodeID: state.getNodeID,
  addNode: state.addNode,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
});

// Custom animated gradient edge
const GlowEdge = ({ id, sourceX, sourceY, targetX, targetY, sourcePosition, targetPosition, style, markerEnd, selected }) => {
  const [edgePath] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  return (
    <>
      {/* Glow effect layer */}
      <path
        d={edgePath}
        fill="none"
        stroke={style?.stroke || '#89b4fa'}
        strokeWidth={selected ? 8 : 6}
        strokeOpacity={0.3}
        filter="blur(4px)"
        className="react-flow__edge-path"
      />
      {/* Main edge */}
      <BaseEdge
        id={id}
        path={edgePath}
        style={{
          ...style,
          strokeWidth: selected ? 3 : 2,
          filter: selected ? 'drop-shadow(0 0 6px rgba(137, 180, 250, 0.8))' : 'none',
        }}
        markerEnd={markerEnd}
      />
    </>
  );
};

// Custom edge types
const edgeTypes = {
  glow: GlowEdge,
};

// Custom edge styling
const defaultEdgeOptions = {
  type: 'glow',
  animated: false,
  style: {
    strokeWidth: 2,
  },
};

export const PipelineUI = ({ isDark }) => {
  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const { nodes, edges, getNodeID, addNode, onNodesChange, onEdgesChange, onConnect } = useStore(selector, shallow);

  const getInitNodeData = useCallback((nodeID, type) => {
    return { id: nodeID, nodeType: type, isDark };
  }, [isDark]);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      if (event?.dataTransfer?.getData('application/reactflow')) {
        const appData = JSON.parse(event.dataTransfer.getData('application/reactflow'));
        const type = appData?.nodeType;

        if (typeof type === 'undefined' || !type) {
          return;
        }

        const position = reactFlowInstance.project({
          x: event.clientX - reactFlowBounds.left,
          y: event.clientY - reactFlowBounds.top,
        });

        const nodeID = getNodeID(type);
        const newNode = {
          id: nodeID,
          type,
          position,
          data: getInitNodeData(nodeID, type),
        };

        addNode(newNode);
      }
    },
    [reactFlowInstance, getNodeID, addNode, getInitNodeData]
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  return (
    <div ref={reactFlowWrapper} className={`flex-1 relative ${isDark ? 'bg-dark-bg' : 'bg-gray-50'}`}>
      {/* Empty state overlay */}
      {nodes.length === 0 && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
          <div className={`
            flex flex-col items-center gap-4 p-8 rounded-2xl
            ${isDark ? 'text-dark-muted' : 'text-gray-400'}
          `}>
            <Grid3X3 className="w-16 h-16 opacity-30" />
            <div className="text-center">
              <p className="text-lg font-medium mb-1">Start Building Your Pipeline</p>
              <p className="text-sm opacity-70">Drag nodes from the toolbar to get started</p>
            </div>
          </div>
        </div>
      )}

      <ReactFlow
        nodes={nodes.map(node => ({ ...node, data: { ...node.data, isDark } }))}
        edges={edges.map(edge => ({ 
          ...edge, 
          type: 'glow',
          style: { 
            stroke: isDark ? '#89b4fa' : '#3b82f6',
            strokeWidth: 2,
          } 
        }))}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onInit={setReactFlowInstance}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        proOptions={proOptions}
        snapGrid={[gridSize, gridSize]}
        connectionLineType="smoothstep"
        connectionLineStyle={{ stroke: isDark ? '#89b4fa' : '#3b82f6', strokeWidth: 2 }}
        defaultEdgeOptions={defaultEdgeOptions}
        fitView
        fitViewOptions={{ padding: 0.2 }}
      >
        <Background 
          color={isDark ? '#313244' : '#d1d5db'} 
          gap={gridSize} 
          size={1.5}
        />
        <Controls 
          className={`
            !border !rounded-xl !overflow-hidden
            ${isDark 
              ? '!bg-dark-surface !border-dark-border [&>button]:!bg-dark-overlay [&>button]:!border-dark-border [&>button]:!text-dark-text [&>button:hover]:!bg-dark-surface' 
              : '!bg-white !border-gray-200 [&>button]:!bg-gray-50 [&>button]:!border-gray-200 [&>button]:!text-gray-700 [&>button:hover]:!bg-gray-100'}
            !shadow-lg
          `}
        />
        <MiniMap
          nodeColor={(node) => {
            const typeColors = {
              input: isDark ? '#89b4fa' : '#3b82f6',
              output: isDark ? '#a6e3a1' : '#22c55e',
              llm: isDark ? '#cba6f7' : '#8b5cf6',
              text: isDark ? '#f9e2af' : '#f59e0b',
              api: isDark ? '#fab387' : '#f97316',
              conditional: isDark ? '#f38ba8' : '#ef4444',
            };
            return typeColors[node.type] || (isDark ? '#6c7086' : '#9ca3af');
          }}
          maskColor={isDark ? 'rgba(17, 17, 27, 0.85)' : 'rgba(249, 250, 251, 0.85)'}
          className={`
            !border !rounded-xl
            ${isDark ? '!bg-dark-surface/90 !border-dark-border' : '!bg-white/90 !border-gray-200'}
            !shadow-lg backdrop-blur-sm
          `}
          pannable
          zoomable
        />
      </ReactFlow>
    </div>
  );
};
