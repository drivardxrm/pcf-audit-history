import * as React from "react";
import { FluentProvider, Skeleton, SkeletonItem, webLightTheme } from "@fluentui/react-components";

import { IInputs } from "./generated/ManifestTypes";
import { ControlContext } from "./context/control-context";
import History from "./components/history";
import { useDataverse } from "./hooks";
import { useEffect, useState } from "react";
import { Audit } from "./interfaces/audit";

interface IProps {
    context: ComponentFramework.Context<IInputs>
}

export default function App({ context }: IProps) {
    const { formatting, parameters, resources } = context;
    const { getAudit } = useDataverse(context);
    const [audits, setAudits] = useState<Audit[] | undefined>(undefined);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        /*getAudit()
            .then(setAudits)
            .finally(() => setLoading(false))*/

            setAudits([
                {
                    id: "1",
                    action: "update",
                    attributes: [
                        {
                            logicalName: "name",
                            displayName: "Name",
                            oldValue: "Nova Lógica",
                            newValue: "novalogica"
                        }
                    ],
                    date: new Date(),
                    user: {
                        id: "23323",
                        name: "Mário Rocha",
                        entityType: "systemuser"
                    },
                    hour: "19:50"
                },
                {
                    id: "2",
                    action: "create",
                    attributes: [
                        {
                            logicalName: "accountnumber",
                            displayName: "Account Number",
                            oldValue: "",
                            newValue: "ACC12345"
                        },
                        {
                            logicalName: "telephone1",
                            displayName: "Phone",
                            oldValue: "",
                            newValue: "+1 555-555-5555"
                        }
                    ],
                    date: new Date(),
                    user: {
                        id: "45678",
                        name: "Laura Mendes",
                        entityType: "systemuser"
                    },
                    hour: "14:30"
                },
                {
                    id: "3",
                    action: "delete",
                    attributes: [
                        {
                            logicalName: "emailaddress1",
                            displayName: "Email",
                            oldValue: "example@domain.com",
                            newValue: ""
                        },
                        {
                            logicalName: "fax",
                            displayName: "Fax",
                            oldValue: "+1 555-555-1234",
                            newValue: ""
                        }
                    ],
                    date: new Date(),
                    user: {
                        id: "78901",
                        name: "Carlos Oliveira",
                        entityType: "systemuser"
                    },
                    hour: "16:10"
                },
                {
                    id: "4",
                    action: "update",
                    attributes: [
                        {
                            logicalName: "address1_city",
                            displayName: "City",
                            oldValue: "New York",
                            newValue: "Los Angeles"
                        },
                        {
                            logicalName: "address1_line1",
                            displayName: "Street Address",
                            oldValue: "123 Main St",
                            newValue: "456 Elm St"
                        }
                    ],
                    date: new Date(),
                    user: {
                        id: "11223",
                        name: "Sofia Andrade",
                        entityType: "systemuser"
                    },
                    hour: "11:20"
                }
            ])
    }, [])

    return (
        <FluentProvider theme={webLightTheme}>
            <ControlContext.Provider value={{ formatting, parameters, resources }}>
                {
                    <History audits={audits}/>
                }
            </ControlContext.Provider>
        </FluentProvider>
    );
}