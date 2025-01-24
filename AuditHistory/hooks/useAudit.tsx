import { Attribute } from "../interfaces/attributes";

export const useAudit = () => {
    //@ts-expect-error - Method does not exist in PCF SDK
    const formContext = Xrm.Page;

    const restoreAllChanges = (attributes: Attribute[]) => attributes.forEach(restore);

    const restore = (attribute: Attribute) => {
        formContext.getAttribute(attribute.logicalName).setValue(
            typeof attribute.oldValue == "object" ? 
                [attribute.oldValue] 
                : attribute.oldValue 
        );

    }

    const saveChanges = () => {
        formContext.data.refresh(true);
    }

    return {
        restoreAllChanges,
        restore,
        saveChanges
    }
}