import { useState } from 'react';
import { BaseNode, NodeField, NodeSelect } from './BaseNode';

const LLM_MODELS = [
  { value: 'gpt-4', label: 'GPT-4' },
  { value: 'gpt-3.5-turbo', label: 'GPT-3.5 Turbo' },
  { value: 'claude-3', label: 'Claude 3' },
  { value: 'llama-2', label: 'Llama 2' },
];

export const LLMNode = ({ id, data, selected }) => {
  const [model, setModel] = useState(data?.model || 'gpt-4');
  const isDark = data?.isDark ?? true;

  return (
    <BaseNode
      id={id}
      title="LLM"
      type="llm"
      inputs={[{ id: 'prompt' }]}
      outputs={[{ id: 'response' }]}
      isDark={isDark}
      selected={selected}
    >
      <NodeField label="Model" isDark={isDark}>
        <NodeSelect
          value={model}
          onChange={(e) => setModel(e.target.value)}
          options={LLM_MODELS}
          isDark={isDark}
        />
      </NodeField>

    </BaseNode>
  );
};

export default LLMNode;
