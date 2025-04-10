import { Component } from '@angular/core';
import { Order } from '../model/order.model';
import { ServiceName } from '../masters/model/service.model';
import { OrderClientComponent } from './order-client/order-client.component';
import { RouterLink } from '@angular/router';
import { OrdersService } from '../../services/orders.service';
import { TuiButton, TuiExpand } from '@taiga-ui/core';
import { OrderList } from '../model/order-list.model';
import {TuiAccordion} from '@taiga-ui/experimental';
import { ListOrderComponent } from '../../shared/list-order/list-order.component';

@Component({
   selector: 'my-orders-client',
   imports: [ListOrderComponent, RouterLink, TuiButton, TuiAccordion],
   templateUrl: './my-orders-client.component.html',
   styleUrl: './my-orders-client.component.css'
})
export class MyOrdersClientComponent {
   orderList: OrderList = {};

   statusCodes: string[] = ['IN_PROGRESS', 'PLACED', 'PENDING', 'COMPLETED', 'DECLINED'];
   statusNames: string[] = ['В работе', 'Выставленные заказы', 'Ожидают ответа мастера', 'Завершённые заказы', 'Отклонённые заказы'];

   constructor(private ordersServis: OrdersService) {
      this.updateOrders();
   }

   updateOrders() {
      this.ordersServis.getMyOrdersClient().subscribe({
         next: (orders: Order[]) => {
            this.fillOrderList(orders);
         }
      })
   }

   fillOrderList(orders: Order[]) {
      var prevStatus: string = '';
      console.log(orders);
      for (var i: number = 0; i < orders.length; ++i) {
         var order: Order = orders[i];
         if (order.status && order.status != prevStatus) {
            this.orderList[order.status] = [order];
         } else if (order.status && (order.status === prevStatus)) {
            this.orderList[prevStatus].push(order);
         }
         prevStatus = order.status || '';
      }
      console.log(this.orderList);
   }

   orderListIsEmpty(): boolean {
      return Object.keys(this.orderList).length == 0;
   }
}
