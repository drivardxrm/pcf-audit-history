import { GenericObject } from "../interfaces/data";

export const getFormattedValue = (
    fields: string[], 
    val: GenericObject | undefined, logicalName: string
): string | number | boolean | object | undefined => {
    if (!val) 
        return val;

    if (fields.includes(`${logicalName}@OData.Community.Display.V1.FormattedValue`))
        return val[`${logicalName}@OData.Community.Display.V1.FormattedValue`];
    else
        return val[logicalName];
}