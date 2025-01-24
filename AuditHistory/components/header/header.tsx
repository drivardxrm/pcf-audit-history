import { Button, Dropdown, Option, OptionOnSelectData, SelectionEvents } from "@fluentui/react-components";
import * as React from "react";
import Select, { ActionMeta, MultiValue, SingleValue, StylesConfig } from 'react-select'
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

interface AttributeOption {
    value: string;
    label: string;
}

const searchBoxStyles: StylesConfig<AttributeOption> = {
    container: (provided) => ({
        ...provided,
        width: '400px',
    }),
};

const Header = ({ order, attributes, onFieldsChanged, onRefresh, onAuditSortOrderChanged }: IProps) => {
    const { resources } = useContext(ControlContext);

    const onFieldSelected = (options: SingleValue<AttributeOption> | MultiValue<AttributeOption>, actionMeta: ActionMeta<AttributeOption>) => {
        const selectedOptions = (options as MultiValue<AttributeOption>)?.map((o: {value: string, label: string}) => {
            return o.value
        });

        onFieldsChanged(selectedOptions);
    }

    const sortedAttributes = useMemo(() => {
        return attributes.filter((item) => item.displayName)
        .sort((a, b) => a.displayName!.localeCompare(b.displayName!))
        .map((attribute) => ({
            value: attribute.logicalName,
            label: attribute.displayName || attribute.logicalName,
        }))
    }, [attributes])

    const onOrderChanged = () => {
        onAuditSortOrderChanged(order == "ascending" ? "descending" : "ascending")
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
            <div style={{ display: 'flex', flexDirection: 'row', gap: 8 }}>
                <Select 
                    options={sortedAttributes}
                    isMulti={true}
                    isClearable={true}
                    closeMenuOnSelect={false}
                    onChange={onFieldSelected}
                    styles={searchBoxStyles}
                />
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