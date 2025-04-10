import { Component } from '@angular/core';
import { Order } from '../../client/model/order.model';
import { OrderMasterComponent } from '../order-master/order-master.component';
import { RouterLink } from '@angular/router';
import { OrdersService } from '../../services/orders.service';
import { ListOrderComponent } from '../../shared/list-order/list-order.component';
import { TuiAccordion } from '@taiga-ui/experimental';
import { OrderList } from '../../client/model/order-list.model';

@Component({
   selector: 'app-my-orders-master',
   imports: [ListOrderComponent, RouterLink, TuiAccordion],
   templateUrl: './my-orders-master.component.html',
   styleUrl: './my-orders-master.component.css'
})
export class MyOrdersMasterComponent {
   orderList: OrderList = {};

   statusCodes: string[] = ['IN_PROGRESS', 'PENDING', 'COMPLETED'];
   statusNames: string[] = ['В работе', 'Предложенные заказы', 'Завершённые заказы'];

   constructor(private ordersServis: OrdersService) {
      this.updateOrders();
   }

   updateOrders() {
      this.ordersServis.getMyOrdersMaster().subscribe({
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
