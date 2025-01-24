import * as React from "react";
import {
  TableBody,
  TableCell,
  TableRow,
  Table,
  TableHeader,
  TableHeaderCell,
  TableCellLayout,
  Button,
} from "@fluentui/react-components";
import { Attribute, Lookup } from "../../interfaces/attributes";
import { ArrowReplyRegular, ArrowUndo16Regular } from "@fluentui/react-icons";
import { useContext, useMemo } from "react";
import { FilterContext } from "../../context/filter-context";
import { useNavigation } from "../../hooks";
import { ControlContext } from "../../context/control-context";
import LookupField from "../lookup/lookup";
import { useAudit } from "../../hooks/useAudit";

const columns = [
  { columnKey: "field", label: "Field" },
  { columnKey: "oldValue", label: "Old Value" },
  { columnKey: "newValue", label: "New Value" },
];

interface IProps {
    attributes: Attribute[]
}

export const AuditAttributes = ({ attributes }: IProps) => {
    const { filter } = useContext(FilterContext);
    const { restore, saveChanges } = useAudit();

    const sortedAttributes = useMemo(() => {
        const filtered = attributes.filter((attr) => attr.displayName)
                            .sort((a, b) => a.displayName!.localeCompare(b.displayName!))

        return filtered?.filter(attr => filter?.some((field) => field.logicalName === attr.logicalName))
    }, [attributes, filter])

    const onRestore = (attribute: Attribute) => {
        restore(attribute)
        saveChanges()
    }


    return (
        <div style={{ padding: '16px', width: 'auto'}} >
            <Table>
                <TableHeader>
                    <TableRow>
                    {
                        columns.map((column) => (
                            <TableHeaderCell key={column.columnKey}>
                                <b>{column.label}</b>
                            </TableHeaderCell>
                        ))
                    }
                    <TableHeaderCell key={"actions"} style={{ width: 30}} />
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                       sortedAttributes?.map((attribute, index) => (
                            <TableRow key={index}>
                                <TableCell>
                                    {attribute.displayName}
                                </TableCell>
                                <TableCell>
                                <TableCellLayout>
                                    {
                                        typeof attribute.oldValue == "object" ? 
                                            <LookupField item={attribute.oldValue as Lookup} />
                                            : attribute.oldValue ?? "-"
                                    }
                                </TableCellLayout>
                                </TableCell>
                                <TableCell>
                                    {
                                        typeof attribute.newValue == "object" ? 
                                            <LookupField item={attribute.newValue as Lookup} />
                                        : attribute.newValue ?? "-"
                                    }
                                </TableCell>
                                <TableCell style={{ width: 30 }}>
                                    <Button 
                                        appearance="transparent"
                                        icon={<ArrowUndo16Regular fontSize={16} />}
                                        onClick={() => onRestore(attribute)} 
                                    />
                                </TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        </div>
    );
};