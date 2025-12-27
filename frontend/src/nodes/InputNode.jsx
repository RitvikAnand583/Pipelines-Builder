// InputNode.jsx - Pipeline input node

import { useState } from 'react';
import { BaseNode, NodeField, NodeInput, NodeSelect } from './BaseNode';

const INPUT_TYPES = [
  { value: 'text', label: 'Text' },
  { value: 'file', label: 'File' },
  { value: 'image', label: 'Image' },
  { value: 'json', label: 'JSON' },
];

export const InputNode = ({ id, data, selected }) => {
  const [name, setName] = useState(data?.inputName || id.replace('customInput-', 'input_'));
  const [inputType, setInputType] = useState(data?.inputType || 'text');
  const isDark = data?.isDark ?? true;

  return (
    <BaseNode
      id={id}
      title="Input"
      type="input"
      inputs={[{ id: 'input', label: 'Input' }]}
      outputs={[{ id: 'value', label: 'Output' }]}
      isDark={isDark}
      selected={selected}
    >
      <NodeField label="Name" isDark={isDark}>
        <NodeInput
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter input name"
          isDark={isDark}
        />
      </NodeField>

      <NodeField label="Type" isDark={isDark}>
        <NodeSelect
          value={inputType}
          onChange={(e) => setInputType(e.target.value)}
          options={INPUT_TYPES}
          isDark={isDark}
        />
      </NodeField>
    </BaseNode>
  );
};


