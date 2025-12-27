import { useState } from 'react';
import { BaseNode, NodeField, NodeSelect, NodeInput } from './BaseNode';

const SERVICES = [
    { value: 'slack', label: 'Slack Webhook' },
    { value: 'discord', label: 'Discord Webhook' },
    { value: 'email', label: 'Send Grid / SMTP' },
    { value: 'notion', label: 'Notion Database' },
];

export const IntegrationNode = ({ id, data, selected }) => {
    const [service, setService] = useState(data?.service || 'slack');
    const [target, setTarget] = useState(data?.target || '');
    const isDark = data?.isDark ?? true;

  // Dynamic placeholder based on selected service
    const getPlaceholder = () => {
        switch(service) {
        case 'email': return 'user@example.com';
        case 'notion': return 'Database ID';
        default: return 'https://hooks...';
        }
    };

    return (
    <BaseNode
        id={id}
        title="Integration"
        type="integration" // Ensure you add an icon for 'integration' (e.g. Webhook or Share2)
        inputs={[{ id: 'payload', label: 'Message/Data' }]} 
        outputs={[{ id: 'status', label: 'Status' }]}
        isDark={isDark}
        selected={selected}
    >
        <NodeField label="Service" isDark={isDark}>
        <NodeSelect
            value={service}
            onChange={(e) => setService(e.target.value)}
            options={SERVICES}
            isDark={isDark}
        />
        </NodeField>

        <NodeField label="Target / URL" isDark={isDark}>
        <NodeInput
            value={target}
            onChange={(e) => setTarget(e.target.value)}
            placeholder={getPlaceholder()}
            isDark={isDark}
        />
        </NodeField>

    </BaseNode>
    );
};

export default IntegrationNode;