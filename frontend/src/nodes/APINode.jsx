// APINode.jsx - HTTP API request node

import { useState } from 'react';
import { BaseNode, NodeField, NodeInput, NodeSelect } from './BaseNode';

const HTTP_METHODS = [
  { value: 'GET', label: 'GET' },
  { value: 'POST', label: 'POST' },
  { value: 'PUT', label: 'PUT' },
  { value: 'PATCH', label: 'PATCH' },
  { value: 'DELETE', label: 'DELETE' },
];

const CONTENT_TYPES = [
  { value: 'application/json', label: 'JSON' },
  { value: 'application/x-www-form-urlencoded', label: 'Form Data' },
  { value: 'multipart/form-data', label: 'Multipart' },
  { value: 'text/plain', label: 'Plain Text' },
];

export const APINode = ({ id, data, selected }) => {
  const [method, setMethod] = useState(data?.method || 'GET');
  const [url, setUrl] = useState(data?.url || '');
  const [contentType, setContentType] = useState(data?.contentType || 'application/json');
  const isDark = data?.isDark ?? true;

  return (
    <BaseNode
      id={id}
      title="API Request"
      type="api"
      inputs={[{ id: 'body' }]}
      outputs={[{ id: 'response' }]}
      isDark={isDark}
      selected={selected}
    >
      <NodeField label="Method" isDark={isDark}>
        <NodeSelect
          value={method}
          onChange={(e) => setMethod(e.target.value)}
          options={HTTP_METHODS}
          isDark={isDark}
        />
      </NodeField>

      <NodeField label="URL" isDark={isDark}>
        <NodeInput
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://api.example.com/endpoint"
          isDark={isDark}
        />
      </NodeField>

      <NodeField label="Content Type" isDark={isDark}>
        <NodeSelect
          value={contentType}
          onChange={(e) => setContentType(e.target.value)}
          options={CONTENT_TYPES}
          isDark={isDark}
        />
      </NodeField>
    </BaseNode>
  );
};

export default APINode;
