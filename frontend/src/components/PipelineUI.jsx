import { useState, useRef, useCallback } from 'react';
import ReactFlow, { Controls, Background, MiniMap } from 'reactflow';
import { useStore } from '../store';
import { shallow } from 'zustand/shallow';
import { nodeTypes } from '../nodes';

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
    <div ref={reactFlowWrapper} className={`flex-1 ${isDark ? 'bg-dark-bg' : 'bg-light-bg'}`}>
      <ReactFlow
        nodes={nodes.map(node => ({ ...node, data: { ...node.data, isDark } }))}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onInit={setReactFlowInstance}
        nodeTypes={nodeTypes}
        proOptions={proOptions}
        snapGrid={[gridSize, gridSize]}
        connectionLineType="smoothstep"
      >
        <Background color={isDark ? '#45475a' : '#ccd0da'} gap={gridSize} />
        <Controls 
          className={`
            ${isDark ? '!bg-dark-surface !border-dark-border' : '!bg-light-surface !border-light-border'}
            !rounded-lg !shadow-lg
          `}
        />
        <MiniMap
          nodeColor={isDark ? '#6c7086' : '#7c7f93'}
          maskColor={isDark ? 'rgba(17, 17, 27, 0.8)' : 'rgba(239, 241, 245, 0.8)'}
          className={`
            ${isDark ? '!bg-dark-surface !border-dark-border' : '!bg-light-surface !border-light-border'}
            !rounded-lg !shadow-lg
          `}
        />
      </ReactFlow>
    </div>
  );
};
