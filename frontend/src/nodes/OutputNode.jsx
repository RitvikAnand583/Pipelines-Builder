// OutputNode.jsx - Pipeline output node

import { useState } from 'react';
import { BaseNode, NodeField, NodeInput, NodeSelect } from './BaseNode';

const OUTPUT_TYPES = [
  { value: 'text', label: 'Text' },
  { value: 'image', label: 'Image' },
  { value: 'file', label: 'File' },
  { value: 'json', label: 'JSON' },
];

export const OutputNode = ({ id, data }) => {
  const [name, setName] = useState(data?.outputName || id.replace('customOutput-', 'output_'));
  const [outputType, setOutputType] = useState(data?.outputType || 'text');
  const isDark = data?.isDark ?? true;

  return (
    <BaseNode
      id={id}
      title="Output"
      icon="📤"
      type="output"
      inputs={[{ id: 'value', label: 'Input' }]}
      isDark={isDark}
    >
      <NodeField label="Name" isDark={isDark}>
        <NodeInput
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter output name"
          isDark={isDark}
        />
      </NodeField>

      <NodeField label="Type" isDark={isDark}>
        <NodeSelect
          value={outputType}
          onChange={(e) => setOutputType(e.target.value)}
          options={OUTPUT_TYPES}
          isDark={isDark}
        />
      </NodeField>
    </BaseNode>
  );
};

export default OutputNode;
