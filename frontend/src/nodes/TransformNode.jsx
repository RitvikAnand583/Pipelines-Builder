import { useState } from 'react';
import { BaseNode, NodeField, NodeSelect, NodeTextArea } from './BaseNode';

const TRANSFORMS = [
    { value: 'to_json', label: 'Text to JSON' },
    { value: 'stringify', label: 'JSON to String' },
    { value: 'to_upper', label: 'To Uppercase' },
    { value: 'to_lower', label: 'To Lowercase' },
    { value: 'filter_regex', label: 'Filter (Regex)' },
];

export const TransformNode = ({ id, data, selected }) => {
    const [transformType, setTransformType] = useState(data?.transformType || 'to_json');
    const [customRule, setCustomRule] = useState(data?.customRule || '');
    const isDark = data?.isDark ?? true;

  // Show secondary input if Regex is selected
const showRuleInput = transformType === 'filter_regex';

return (
    <BaseNode
        id={id}
        title="Transform"
        type="transform"
        inputs={[{ id: 'input', label: 'Data' }]}
        outputs={[{ id: 'output', label: 'Result' }]}
        isDark={isDark}
        selected={selected}
    >
        <NodeField label="Function" isDark={isDark}>
            <NodeSelect
                value={transformType}
                onChange={(e) => setTransformType(e.target.value)}
                options={TRANSFORMS}
                isDark={isDark}
            />
        </NodeField>

        {showRuleInput && (
        <NodeField label="Regex Pattern" isDark={isDark}>
            <NodeTextArea
            value={customRule}
            onChange={(e) => setCustomRule(e.target.value)}
            placeholder="e.g. ^[a-z0-9]+$"
            isDark={isDark}
            className="font-mono text-xs min-h-[60px]"
            />
        </NodeField>
        )}
    </BaseNode>
    );
};

export default TransformNode;