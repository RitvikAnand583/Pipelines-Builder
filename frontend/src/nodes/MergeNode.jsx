    // MergeNode.jsx - Combines multiple inputs into one

import { useState } from 'react';
import { BaseNode, NodeField, NodeSelect } from './BaseNode';

const MERGE_TYPES = [
    { value: 'concatenate', label: 'Concatenate (String)' },
    { value: 'array', label: 'Create List (Array)' },
    { value: 'object', label: 'Merge Objects (JSON)' },
];

export const MergeNode = ({ id, data, selected }) => {
    const [mergeType, setMergeType] = useState(data?.mergeType || 'concatenate');
    const isDark = data?.isDark ?? true;

return (
    <BaseNode
        id={id}
        title="Merge Data"
        type="merge" // Suggested icon: GitMerge or Combine
        useMultipleHandles={true}
        inputs={[
        { id: 'input_a' },
        { id: 'input_b' }
        ]}
        outputs={[{ id: 'merged' }]}
        isDark={isDark}
        selected={selected}
    >
        <NodeField label="Merge Strategy" isDark={isDark}>
        <NodeSelect
            value={mergeType}
            onChange={(e) => setMergeType(e.target.value)}
            options={MERGE_TYPES}
            isDark={isDark}
        />
        </NodeField>

        <div className={`p-2 rounded-lg text-[10px] font-mono mt-1 ${
        isDark ? 'bg-black/20 text-gray-400' : 'bg-gray-100 text-gray-500'
        }`}>
        {mergeType === 'concatenate' && 'Output: "Input A Input B"'}
        {mergeType === 'array' && 'Output: ["Input A", "Input B"]'}
        {mergeType === 'object' && 'Output: { ...A, ...B }'}
        </div>
    </BaseNode>
);
};

export default MergeNode;