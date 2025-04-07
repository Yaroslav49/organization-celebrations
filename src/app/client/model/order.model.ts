import { ServiceName } from "../masters/model/service.model";

export interface Order {
   id?: number;
   status?: string;
   serviceType: ServiceName;
   description: string;
   price: number;
   address: string;
   dateFrom: string;
   dateTo: string
   nameClient?: string;
   phoneClient?: string;
   nameMaster?: string;
   phoneMaster?: string;
}