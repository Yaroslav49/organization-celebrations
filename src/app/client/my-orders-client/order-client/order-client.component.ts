import { Component, Input } from '@angular/core';
import { Order } from '../../model/order.model';
import { ServiceName, ServiceNameDisplay } from '../../masters/model/service.model';
import { OrderInfoComponent } from '../../../shared/order-info/order-info.component';
import { TuiButton, TuiIcon } from '@taiga-ui/core';

@Component({
   selector: 'order-client',
   imports: [OrderInfoComponent, TuiButton, TuiIcon],
   templateUrl: './order-client.component.html',
   styleUrl: './order-client.component.css'
})
export class OrderClientComponent {
   @Input() order!: Order;

   getServiceDisplayName(serviceName: ServiceName): string {
      return ServiceNameDisplay[serviceName];
   }
}
