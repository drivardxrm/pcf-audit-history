import * as React from 'react';
import { Audit } from '../interfaces/audit';
import { AuditCard } from './cards/audit';

interface IHistoryProps {
    audits?: Audit[]
}

export default function History({ audits }: IHistoryProps) {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', padding: 2, gap: 8 }}>
            {
                audits?.map((audit) => (
                    <AuditCard key={audit.id} audit={audit} />
                ))
            }
        </div>
    );
}
