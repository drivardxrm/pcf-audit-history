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
import { Attribute } from "../../interfaces/attributes";
import { ArrowReplyRegular, ArrowUndo16Regular } from "@fluentui/react-icons";

const columns = [
  { columnKey: "field", label: "Field" },
  { columnKey: "oldValue", label: "Old Value" },
  { columnKey: "newValue", label: "New Value" },
];

interface IProps {
    attributes: Attribute[]
}

export const AuditAttributes = ({ attributes }: IProps) => {
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
                attributes.map((attribute, index) => (
                    <TableRow key={index}>
                        <TableCell>
                            {attribute.displayName}
                        </TableCell>
                        <TableCell>
                        <TableCellLayout>
                            {attribute.oldValue ?? "-"}
                        </TableCellLayout>
                        </TableCell>
                        <TableCell>
                            {attribute.newValue ?? "-"}
                        </TableCell>
                        <TableCell style={{ width: 30 }}>
                            <Button 
                                appearance="transparent"
                                icon={
                                    <ArrowUndo16Regular fontSize={16} />
                                } 
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