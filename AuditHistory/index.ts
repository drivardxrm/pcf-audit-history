import App from "./app";
import { IInputs, IOutputs } from "./generated/ManifestTypes";
import * as React from "react";

export class AuditHistory implements ComponentFramework.ReactControl<IInputs, IOutputs> {
    private mainControl: ComponentFramework.ReactControl<IInputs, IOutputs>;
    private notifyOutputChanged: () => void;
    
    constructor() { }

    public init(
        context: ComponentFramework.Context<IInputs>,
        notifyOutputChanged: () => void,
        state: ComponentFramework.Dictionary
    ): void {
        this.notifyOutputChanged = notifyOutputChanged;
    }

    public updateView(context: ComponentFramework.Context<IInputs>): React.ReactElement {
        return React.createElement(App, { context });
    }

    public getOutputs(): IOutputs {
        return { };
    }

    public destroy(): void {
        this.mainControl.destroy()
    }
}
