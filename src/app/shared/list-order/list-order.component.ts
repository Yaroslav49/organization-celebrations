import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Order } from '../../client/model/order.model';
import { OrderClientComponent } from '../../client/my-orders-client/order-client/order-client.component';
import { OrderMasterComponent } from '../../master/order-master/order-master.component';

@Component({
   selector: 'list-order',
   imports: [OrderClientComponent, OrderMasterComponent],
   templateUrl: './list-order.component.html',
   styleUrl: './list-order.component.css'
})
export class ListOrderComponent {
   @Input() orders!: Order[];
   @Input() isClient!: boolean;
   @Output() orderChanged = new EventEmitter<void>();

   onOrderChanged(): void {
      this.orderChanged.emit();
   }
}
