export default interface Attribute {
    logicalName: string,
    displayName?: string | null,
    oldValue?: string | number | object | boolean,
    newValue?: string | number | object | boolean
}