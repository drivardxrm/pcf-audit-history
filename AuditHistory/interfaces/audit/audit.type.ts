import { Attribute, Lookup } from "../attributes";

export default interface Audit {
    id: string;
    date: Date;
    hour?: string;
    action: string;
    user: Lookup;
    attributes: Attribute[];
}