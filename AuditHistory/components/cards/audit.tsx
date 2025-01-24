import * as React from "react";

import {
  makeStyles,
  Body1,
  Caption1,
  Button,
  Label,
  Title3,
  Subtitle2,
  Subtitle1,
} from "@fluentui/react-components";
import { ArrowReplyRegular, ArrowUndo16Regular, ShareRegular } from "@fluentui/react-icons";
import {
  Card,
  CardFooter,
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
    const { formatting } = useContext(ControlContext);
    const { restoreAllChanges, saveChanges } = useAudit();

    const onRestoreAll = (attributes: Attribute[]) => {
        restoreAllChanges(attributes)
        saveChanges()
    }

    return (
        <Card className={styles.card} style={{ padding: 24 }}>
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
                <Button 
                    appearance="outline" 
                    icon={<ArrowUndo16Regular fontSize={16} />}
                    onClick={() => onRestoreAll(audit.attributes)}
                >
                    Restore All
                </Button>
            </div>
            {
                audit.attributes && audit.attributes.length > 0 && (
                    <CardPreview>
                        <AuditAttributes attributes={audit.attributes} />
                    </CardPreview>
                )
            }
        </Card>
    );
};
