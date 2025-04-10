import { Component } from '@angular/core';
import { Order } from '../../client/model/order.model';
import { OrderMasterComponent } from '../order-master/order-master.component';
import { OrdersService } from '../../services/orders.service';
import { PublicOrdersPage } from './model/public-orders-page.model';
import { AuthorizationService } from '../../services/authorization.service';

@Component({
   selector: 'app-public-orders',
   imports: [OrderMasterComponent],
   templateUrl: './public-orders.component.html',
   styleUrl: './public-orders.component.css'
})
export class PublicOrdersComponent {
   orders: Order[] = [];

   constructor(private ordersServis: OrdersService, private authService: AuthorizationService) {
      this.updateOrders();
   }

   updateOrders() {
      this.ordersServis.getPublicOrders().subscribe({
         next: (page: PublicOrdersPage) => {
            this.orders = page.placedOrdersByClients;
            for (let order of this.orders) {
               order.status = 'PLACED';
            }
            if (page.balance != null) {
               this.authService.balance = page.balance;
            }
            if (page.photoUrl != null) {
               this.authService.photoUrl = page.photoUrl;
            }
         }
      })
   }
}
