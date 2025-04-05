import { ServiceName } from "../masters/model/service.model";

export interface Order {
   id?: string;
   serviceName: ServiceName;
   description: string;
   price: number;
   address: string;
   dateFrom: string;
   dateTo: string
}