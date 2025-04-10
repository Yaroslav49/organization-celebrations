import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Order } from '../../client/model/order.model';
import { OrderInfoComponent } from '../../shared/order-info/order-info.component';
import { TuiAlertService, TuiButton, TuiIcon } from '@taiga-ui/core';
import { OrdersService } from '../../services/orders.service';
import { Router } from '@angular/router';
import { AlertService } from '../../services/alert.service';

@Component({
   selector: 'order-master',
   imports: [OrderInfoComponent, TuiButton, TuiIcon],
   templateUrl: './order-master.component.html',
   styleUrl: './order-master.component.css'
})
export class OrderMasterComponent {
   @Input() order!: Order;
   @Output() orderChanged = new EventEmitter<void>();

   constructor(private ordersService: OrdersService, private router: Router, private alertService: AlertService) { }

   takeOrder() {
      var orderId: number = this.order.id || -1;
      this.ordersService.assignOrder(orderId).subscribe({
         next: (result: string) => {
            if (result == "ok") {
               this.orderChanged.emit();
               this.alertService.showMessage('Заказ взят в работу');
            } else {
               console.log(`error: ${result}`);
               this.alertService.showError(result);
            }
         }
      });
   }

   acceptOrder() {
      var orderId: number = this.order.id || -1;
      this.ordersService.acceptOrder(orderId).subscribe({
         next: (result: string) => {
            if (result == "ok") {
               this.orderChanged.emit();
               this.alertService.showMessage('Заказ взят в работу');
            } else {
               console.log(`error: ${result}`);
               this.alertService.showError(result);
            }
         }
      });
   }

   declineOrder() {
      var orderId: number = this.order.id || -1;
      this.ordersService.declineOrder(orderId).subscribe({
         next: (result: string) => {
            if (result == "ok") {
               this.orderChanged.emit();
               this.alertService.showMessage('Заказ отклонён');
            } else {
               console.log(`error: ${result}`);
               this.alertService.showError(result);
            }
         }
      });
   }
}
