// TextNode.jsx - Text input/template node

import { useState } from 'react';
import { BaseNode, NodeField, NodeTextArea } from './BaseNode';

export const TextNode = ({ id, data }) => {
  const [text, setText] = useState(data?.text || '');
  const isDark = data?.isDark ?? true;

  return (
    <BaseNode
      id={id}
      title="Text"
      icon="📝"
      type="text"
      outputs={[{ id: 'output', label: 'Text' }]}
      isDark={isDark}
    >
      <NodeField label="Content" isDark={isDark}>
        <NodeTextArea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter your text here..."
          rows={3}
          isDark={isDark}
        />
      </NodeField>
    </BaseNode>
  );
};

export default TextNode;
