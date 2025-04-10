import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Order } from '../../model/order.model';
import { OrderInfoComponent } from '../../../shared/order-info/order-info.component';
import { TuiButton, tuiDialog, TuiIcon } from '@taiga-ui/core';
import { Router } from '@angular/router';
import { OrdersService } from '../../../services/orders.service';
import { AlertService } from '../../../services/alert.service';
import { RatingComponent } from '../rating/rating.component';

@Component({
   selector: 'order-client',
   imports: [OrderInfoComponent, TuiButton, TuiIcon],
   templateUrl: './order-client.component.html',
   styleUrl: './order-client.component.css'
})
export class OrderClientComponent {
   @Input() order!: Order;
   @Output() orderChanged = new EventEmitter<void>();

   private readonly ratingDialog = tuiDialog(RatingComponent, {
      dismissible: true,
      size: 's',
   });

   constructor(private ordersService: OrdersService, private router: Router, private alertService: AlertService) { }

   cancelOrder() {
      var orderId: number = this.order.id || -1;
      this.ordersService.cancelOrder(orderId).subscribe({
         next: (result: string) => {
            if (result == "ok") {
               this.orderChanged.emit();
               this.alertService.showMessage("Заказ отменён");
            } else {
               console.log(`error: ${result}`);
               this.alertService.showError(result);
            }
         }
      });
   }

   closeOrder() {
      var orderId: number = this.order.id || -1;
      this.ordersService.closeOrder(orderId).subscribe({
         next: (result: string) => {
            if (result == "ok") {
               this.orderChanged.emit();
               this.showRatingDialog();
            } else {
               console.log(`error: ${result}`);
               this.alertService.showError(result);
            }
         }
      });
   }

   private showRatingDialog() {
      var orderId: number = this.order.id || -1;
      this.ratingDialog(orderId).subscribe({
         next: (result) => {
            console.log(result);
            if (result == 'ok') {
               this.alertService.showMessage("Заказ закрыт");
            } else {
               this.alertService.showError(result);
            }
         },
      });
   }
}
