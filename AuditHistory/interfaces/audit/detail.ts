import { AuditRecord } from ".";
import { GenericObject } from "../data";

export default interface AuditDetail {
    OldValue?: GenericObject;
    NewValue?: GenericObject;
    AuditRecord: AuditRecord;
}