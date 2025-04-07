import { Component } from '@angular/core';
import { Order } from '../model/order.model';
import { ServiceName, ServiceNameDisplay } from '../masters/model/service.model';
import { OrderClientComponent } from './order-client/order-client.component';
import { RouterLink } from '@angular/router';
import { OrdersService } from '../../services/orders.service';

@Component({
   selector: 'my-orders-client',
   imports: [OrderClientComponent, RouterLink],
   templateUrl: './my-orders-client.component.html',
   styleUrl: './my-orders-client.component.css'
})
export class MyOrdersClientComponent {
   orders: Order[] = [
      {
         id: 1,
         status: 'IN_PROGRESS',
         serviceType: ServiceName.DECORATOR,
         description: "Требуется декоратор на свадьбу в стиле рустик",
         price: 1500,
         address: "ул. Есенина, дом 56",
         dateFrom: "2025-04-12",
         dateTo: "2025-04-12",
         nameMaster: 'Саня Пиво',
         phoneMaster: '+79037125713'
      },
      {
         id: 2,
         status: 'PLACED',
         serviceType: ServiceName.DECORATOR,
         description: "Требуется декоратор на свадьбу в стиле рустик",
         price: 1500,
         address: "ул. Есенина, дом 56",
         dateFrom: "2025-04-12",
         dateTo: "2025-04-13"
      },
      {
         id: 3,
         status: 'PLACED',
         serviceType: ServiceName.DECORATOR,
         description: "Требуется декоратор на свадьбу в стиле рустик",
         price: 1500,
         address: "ул. Есенина, дом 56",
         dateFrom: "2024-04-12",
         dateTo: "2025-04-12"
      },
   ];

   constructor(private ordersServis: OrdersService) {
      this.ordersServis.getMyOrdersClient().subscribe({
         next: (orders: Order[]) => {
            this.orders = orders;
         }
      })
   }

   getServiceDisplayName(serviceName: ServiceName): string {
      return ServiceNameDisplay[serviceName];
   }
}
