import { createContext } from "react";
import { IInputs } from "../generated/ManifestTypes";

interface IControlContext {
    context: ComponentFramework.Context<IInputs>
    parameters: IInputs,
    formatting: ComponentFramework.Formatting,
    resources: ComponentFramework.Resources
}

export const ControlContext = createContext<IControlContext>(undefined!);