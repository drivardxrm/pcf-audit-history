import * as React from 'react';
import { Audit } from '../interfaces/audit';
import { AuditCard } from './cards/audit';
import { Subtitle2 } from '@fluentui/react-components';

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

            {
                !audits || audits.length <= 0 && (
                    <div 
                        style={{ 
                            height: '200px', display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center'
                        }}
                    >
                        <Subtitle2>No audit history found</Subtitle2>
                    </div>
                )
            }
        </div>
    );
}
