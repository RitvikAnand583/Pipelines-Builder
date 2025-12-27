// ConditionalNode.jsx - Conditional branching node

import { useState } from 'react';
import { BaseNode, NodeField, NodeInput, NodeSelect } from './BaseNode';

const OPERATORS = [
  { value: 'equals', label: 'Equals (==)' },
  { value: 'not_equals', label: 'Not Equals (!=)' },
  { value: 'greater_than', label: 'Greater Than (>)' },
  { value: 'less_than', label: 'Less Than (<)' },
  { value: 'contains', label: 'Contains' },
  { value: 'starts_with', label: 'Starts With' },
  { value: 'ends_with', label: 'Ends With' },
  { value: 'is_empty', label: 'Is Empty' },
  { value: 'is_not_empty', label: 'Is Not Empty' },
];

export const ConditionalNode = ({ id, data, selected }) => {
  const [operator, setOperator] = useState(data?.operator || 'equals');
  const [compareValue, setCompareValue] = useState(data?.compareValue || '');
  const isDark = data?.isDark ?? true;

  const needsCompareValue = !['is_empty', 'is_not_empty'].includes(operator);

  return (
    <BaseNode
      id={id}
      title="Conditional"
      type="conditional"
      inputs={[{ id: 'value', label: 'Value' }]}
      outputs={[
        { id: 'true', label: 'True' },
        { id: 'false', label: 'False' },
      ]}
      isDark={isDark}
      useMultipleHandles={true}
      selected={selected}
    >
      <NodeField label="Condition" isDark={isDark}>
        <NodeSelect
          value={operator}
          onChange={(e) => setOperator(e.target.value)}
          options={OPERATORS}
          isDark={isDark}
        />
      </NodeField>

      {needsCompareValue && (
        <NodeField label="Compare To" isDark={isDark}>
          <NodeInput
            value={compareValue}
            onChange={(e) => setCompareValue(e.target.value)}
            placeholder="Enter comparison value"
            isDark={isDark}
          />
        </NodeField>
      )}
    </BaseNode>
  );
};

export default ConditionalNode;
