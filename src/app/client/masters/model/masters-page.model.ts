import { Master } from "./master.model";

export interface MastersPage {
    masters: Master[];
    photoUrl: string | null;
    balance: number | null;
}