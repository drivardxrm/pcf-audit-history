import * as React from "react";

import {
  makeStyles,
  Caption1,
  Button,
  Subtitle2,
} from "@fluentui/react-components";
import { ArrowUndo16Regular } from "@fluentui/react-icons";
import {
  Card,
  CardHeader,
  CardPreview,
} from "@fluentui/react-components";
import { Audit } from "../../interfaces/audit";
import { useContext } from "react";
import { ControlContext } from "../../context/control-context";
import { AuditAttributes } from "../table/table";
import { useAudit } from "../../hooks/useAudit";
import { Attribute } from "../../interfaces/attributes";

const useStyles = makeStyles({
  card: {
    margin: "auto",
    width: "720px",
    maxWidth: "100%"
  }
});

interface IProps {
    audit: Audit;
}

export const AuditCard = ({ audit }: IProps) => {
    const styles = useStyles();
    const { context, formatting, resources } = useContext(ControlContext);
    const { restoreAllChanges, saveChanges } = useAudit(context);

    const onRestoreAll = (attributes: Attribute[]) => {
        restoreAllChanges(attributes)
        saveChanges()
    }

    return (
        <div style={{ width: '100%' }}>
            <Card className={styles.card} style={{ width: '100%', padding: 24 }}>
                <div style={{ 
                        display: 'flex', 
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}
                >
                    <CardHeader
                        header={
                            <Subtitle2 style={{ textTransform: 'capitalize' }}>
                                <b>{audit.operation}</b>
                            </Subtitle2>
                        }
                        description={
                            <Caption1>
                                {formatting.formatDateShort(audit.timestamp, true)} · {audit.user.name}
                            </Caption1>
                        }
                    />
                    {
                        audit.attributes && audit.attributes.length > 0 &&  (
                            <Button 
                                appearance="outline" 
                                icon={<ArrowUndo16Regular fontSize={16} />}
                                onClick={() => onRestoreAll(audit.attributes)}
                            >
                                {resources.getString("restore-all")}
                            </Button>
                        )
                    }
                </div>
                {
                    audit.attributes && audit.attributes.length > 0 && (
                        <CardPreview>
                            <AuditAttributes attributes={audit.attributes} />
                        </CardPreview>
                    )
                }
            </Card>
        </div>
    );
};
