import { createContext } from "react";
import { IInputs } from "../generated/ManifestTypes";

interface IControlContext {
    parameters: IInputs,
    formatting: ComponentFramework.Formatting,
    resources: ComponentFramework.Resources
}

export const ControlContext = createContext<IControlContext>(undefined!);