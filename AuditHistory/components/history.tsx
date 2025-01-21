import * as React from 'react';
import { useContext } from 'react';
import { ControlContext } from '../context/control-context';
import { Label, Title3 } from '@fluentui/react-components';
import { Audit } from '../interfaces/audit';
import { AuditCard } from './cards/audit';
import { Attribute } from '../interfaces/attributes';

interface IHistoryProps {
    audits?: Audit[]
}

export default function History({ audits }: IHistoryProps) {
    const { resources } = useContext(ControlContext);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', padding: 16, gap: 8}}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4}}>
                <Title3>{resources.getString("header-message")}</Title3>
                <Label>Monitor and audit field changes in Dynamics 365</Label>
            </div>
            {
                audits?.map((audit) => (
                    <AuditCard key={audit.id} audit={audit} />
                ))
            }
        </div>
    );
}
