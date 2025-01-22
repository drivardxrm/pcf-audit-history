import { useEffect, useMemo } from "react";
import { IInputs } from "../generated/ManifestTypes";
import { XrmService } from "./service";
import Record from "../interfaces/data/record.type";
import { EntityDefinition } from "../interfaces/definition";
import { Attribute, AttributeMetada } from "../interfaces/attributes";
import { XrmRequest, XrmRequestMetadata, XrmResponse } from "../interfaces/xrm";
import { History } from "../interfaces/data";
import { Audit, AuditDetail } from "../interfaces/audit";
import { getFormattedValue } from "../utils/utils";

const useDataverse = (context: ComponentFramework.Context<IInputs>) => {
    const record = useMemo(() => {
        return {
            //@ts-expect-error - contextInfo is not recognized
            id: context?.mode.contextInfo.entityId,
            //@ts-expect-error - contextInfo is not recognized
            entityLogicalName: context?.mode.contextInfo.entityTypeName
        } as Record
    }, [context?.mode]);

    const xrmService = useMemo(() => {
        const service = XrmService.getInstance();
        service.setContext(context);
        return service;
    }, []);

    const getAttributes = async (): Promise<AttributeMetada[]> => {
        const result = await xrmService.fetch(
            `api/data/v9.1/EntityDefinitions(LogicalName='${record.entityLogicalName}')
            /Attributes?$select=LogicalName,DisplayName&$filter=AttributeOf eq null&$orderby=DisplayName asc`,
        ) as EntityDefinition[];

        return result.map((item: EntityDefinition) => {
            return {
                logicalName: item.LogicalName,
                displayName: item.DisplayName.UserLocalizedLabel?.Label
            }
        });
    }

    const getAudit = async (): Promise<Audit[]> => {
        const request: XrmRequest = {
            Target: {
                "@odata.type": `Microsoft.Dynamics.CRM.${record.entityLogicalName}`,
                [`${record.entityLogicalName}id`]: record.id,
            },
            getMetadata: () => {
                return {
                    parameterTypes: {
                        Target: { structuralProperty: 5, typeName: "mscrm.crmbaseentity" }
                    },
                    operationType: 1,
                    operationName: "RetrieveRecordChangeHistory"
                }
            } ,
        };

        const audit = await xrmService.execute(request) as History;
        const attributes = await getAttributes();

        return audit.AuditDetailCollection.AuditDetails.map((detail: AuditDetail) => {
            const auditDetail = Object.keys(detail);
            const oldValue = auditDetail.includes("OldValue") ? Object.keys(detail.OldValue!) : [];
            const newValue = auditDetail.includes("NewValue") ? Object.keys(detail.NewValue!) : [];

            const dataAttributes = attributes?.map((attributeMetadata) => {
                if (
                    newValue.includes(attributeMetadata.logicalName) || 
                    oldValue.includes(`_${attributeMetadata.logicalName}_value`)
                ) {
                    return {
                        logicalName: attributeMetadata.logicalName,
                        displayName: attributeMetadata.displayName,
                        oldValue: oldValue.includes(attributeMetadata.logicalName)
                            ? getFormattedValue(oldValue, detail.OldValue, attributeMetadata.logicalName)
                            : oldValue.includes(`_${attributeMetadata.logicalName}_value`)
                            ? detail.OldValue![`_${attributeMetadata.logicalName}_value@OData.Community.Display.V1.FormattedValue`]
                            : "",
                        newValue: newValue.includes(attributeMetadata.logicalName)
                            ? getFormattedValue(newValue, detail.NewValue, attributeMetadata.logicalName)
                            : newValue.includes(`_${attributeMetadata.logicalName}_value`)
                            ? detail.NewValue![`_${attributeMetadata.logicalName}_value@OData.Community.Display.V1.FormattedValue`]
                            : "",
                    };
                }                
            })

            return {
                id: detail.AuditRecord.auditid,
                date: new Date(detail.AuditRecord["createdon"]),
                hour: detail.AuditRecord["createdon@OData.Community.Display.V1.FormattedValue"].split(" ")[1],
                action: detail.AuditRecord["action@OData.Community.Display.V1.FormattedValue"],
                user: {
                    id: detail.AuditRecord._userid_value,
                    name: detail.AuditRecord["_userid_value@OData.Community.Display.V1.FormattedValue"],
                    entityType: detail.AuditRecord["_userid_value@Microsoft.Dynamics.CRM.lookuplogicalname"]
                },
                attributes: dataAttributes
            } as Audit;
        });

        
    }

    return {
        getAudit
    }
}

export default useDataverse;