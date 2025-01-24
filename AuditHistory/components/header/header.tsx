import { Button, Dropdown, Option, OptionOnSelectData, SelectionEvents } from "@fluentui/react-components";
import * as React from "react";
import { Attribute } from "../../interfaces/attributes";
import { useContext, useMemo } from "react";
import { ArrowClockwiseRegular, ArrowSortDownLinesRegular, ArrowSortUpLinesRegular } from '@fluentui/react-icons';
import { ControlContext } from "../../context/control-context";

interface IProps {
    order: 'descending' | 'ascending'
    attributes: Attribute[],
    onFieldsChanged: (attributes: string[]) => void,
    onRefresh: () => void;
    onAuditSortOrderChanged: (order: 'descending' | 'ascending') => void
}

const Header = ({ order, attributes, onFieldsChanged, onRefresh, onAuditSortOrderChanged }: IProps) => {
    const { resources } = useContext(ControlContext);

    const onFieldSelected = (_: SelectionEvents, data: OptionOnSelectData) => {
        onFieldsChanged(data.selectedOptions);
    }

    const sortedAttributes = useMemo(() => {
        return attributes.filter((item) => item.displayName)
        .sort((a, b) => a.displayName!.localeCompare(b.displayName!))
    }, [attributes])

    const onOrderChanged = () => {
        onAuditSortOrderChanged(order == "ascending" ? "descending" : "ascending")
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
            <div style={{ display: 'flex', flexDirection: 'row', gap: 8 }}>
                <Dropdown 
                    placeholder={resources.getString("dropdown-placeholder")} 
                    onOptionSelect={onFieldSelected}
                    multiselect
                    clearable
                >
                    {
                        sortedAttributes?.map((attr) => (
                            <Option key={attr.logicalName} value={attr.logicalName}>
                                {attr.displayName!}
                            </Option>
                        ))
                    }
                </Dropdown>
                <Button onClick={onRefresh} icon={<ArrowClockwiseRegular />} />
            </div>
            <Button
                icon={ order == "ascending" ? <ArrowSortDownLinesRegular /> : <ArrowSortUpLinesRegular />} 
                onClick={onOrderChanged} appearance="transparent"
            >
                {
                    order == "ascending" ? 
                        resources.getString("sort-descending") 
                        : resources.getString("sort-ascending")
                }
            </Button>
        </div>
    );
}
 
export default Header;