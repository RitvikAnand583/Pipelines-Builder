// nodes/index.js - Central export for all node components

// Base components
export { BaseNode, NodeField, NodeInput, NodeSelect, NodeTextArea, NodeInfo } from './BaseNode';

// Node components
export { InputNode } from './InputNode';
export { OutputNode } from './OutputNode';
export { LLMNode } from './LLMNode';
export { TextNode } from './TextNode';
export { APINode } from './APINode';
export { ConditionalNode } from './ConditionalNode';
export { TransformNode } from './TransformNode';
export { MergeNode } from './MergeNode';
export { IntegrationNode } from './IntegrationNode';

// Node type registry for React Flow
export const nodeTypes = {
  customInput: require('./InputNode').InputNode,
  customOutput: require('./OutputNode').OutputNode,
  llm: require('./LLMNode').LLMNode,
  text: require('./TextNode').TextNode,
  api: require('./APINode').APINode,
  conditional: require('./ConditionalNode').ConditionalNode,
  transform: require('./TransformNode').TransformNode,
  merge: require('./MergeNode').MergeNode,
  integration: require('./IntegrationNode').IntegrationNode,
};

// Node configuration for toolbar
export const nodeConfig = [
  { type: 'customInput', label: 'Input', icon: '📥' },
  { type: 'customOutput', label: 'Output', icon: '📤' },
  { type: 'llm', label: 'LLM', icon: '🤖' },
  { type: 'text', label: 'Text', icon: '📝' },
  { type: 'api', label: 'API', icon: '🌐' },
  { type: 'conditional', label: 'Conditional', icon: '🔀' },
  { type: 'transform', label: 'Transform', icon: '⚙️' },
  { type: 'merge', label: 'Merge', icon: '🔗' },
  { type: 'integration', label: 'Integration', icon: '🔌' },
];
