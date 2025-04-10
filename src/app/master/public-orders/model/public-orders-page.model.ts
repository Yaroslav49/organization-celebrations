import { Order } from "../../../client/model/order.model";

export interface PublicOrdersPage {
    placedOrdersByClients: Order[];
    photoUrl: string | null;
    balance: number | null;
}