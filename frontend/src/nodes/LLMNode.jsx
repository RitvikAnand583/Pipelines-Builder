// LLMNode.jsx - Large Language Model node

import { useState } from 'react';
import { BaseNode, NodeField, NodeSelect, NodeInfo } from './BaseNode';

const LLM_MODELS = [
  { value: 'gpt-4', label: 'GPT-4' },
  { value: 'gpt-3.5-turbo', label: 'GPT-3.5 Turbo' },
  { value: 'claude-3', label: 'Claude 3' },
  { value: 'llama-2', label: 'Llama 2' },
];

export const LLMNode = ({ id, data }) => {
  const [model, setModel] = useState(data?.model || 'gpt-4');
  const isDark = data?.isDark ?? true;

  return (
    <BaseNode
      id={id}
      title="LLM"
      icon="🤖"
      type="llm"
      inputs={[
        { id: 'system', label: 'System' },
        { id: 'prompt', label: 'Prompt' },
      ]}
      outputs={[{ id: 'response', label: 'Response' }]}
      isDark={isDark}
    >
      <NodeField label="Model" isDark={isDark}>
        <NodeSelect
          value={model}
          onChange={(e) => setModel(e.target.value)}
          options={LLM_MODELS}
          isDark={isDark}
        />
      </NodeField>

      <NodeInfo isDark={isDark}>
        Connects to AI language model for text generation.
      </NodeInfo>
    </BaseNode>
  );
};

export default LLMNode;
