import * as React from "react";
import { Link } from "@fluentui/react-components";
import { Lookup } from "../../interfaces/attributes";
import { useContext } from "react";
import { ControlContext } from "../../context/control-context";
import { useNavigation } from "../../hooks";

interface IProps {
    item: Lookup
}

const LookupField = ({ item }: IProps) => {
    const { context } = useContext(ControlContext);
    const { openForm } = useNavigation(context)
    
    const onLookupClicked = (value: Lookup) => {
        openForm(value.entityType, value.id)
    }

    return (
        <Link 
            style={{ 
                backgroundColor: "rgb(207, 228, 250)",
                color: "rgb(17, 94, 163)",
                borderRadius: 4,
                padding: 6,
                textDecoration: 'underline'
            }}
            onClick={() => onLookupClicked(item)}
        >
            {item.name}
        </Link>
    );
}
 
export default LookupField;