import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TuiDay, TuiDayRange } from '@taiga-ui/cdk/date-time';
import { TuiButton, TuiIcon } from '@taiga-ui/core';
import { TuiInputDateRangeModule, TuiTextfieldControllerModule } from '@taiga-ui/legacy';
import { OrdersService } from '../../services/orders.service';
import { Order } from '../model/order.model';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
   selector: 'create-order',
   imports: [TuiIcon, TuiButton, ReactiveFormsModule, TuiInputDateRangeModule, TuiTextfieldControllerModule],
   templateUrl: './create-order.component.html',
   styleUrl: './create-order.component.css'
})
export class CreateOrderComponent {
   readonly today: Date;
   readonly tomorrow: Date;
   readonly minDay: TuiDay;
   orderForm: FormGroup;
   error: string | null = null;
   masterId: number = -1;
   
   private subscription: Subscription;

   constructor(private ordersService: OrdersService, private activateRoute: ActivatedRoute, private router: Router) {
      this.today = new Date();
      this.tomorrow = new Date(this.today);
      this.tomorrow.setDate(this.today.getDate() + 1);
      this.minDay = new TuiDay(this.tomorrow.getFullYear(), this.tomorrow.getMonth(), this.tomorrow.getDate());

      this.orderForm = new FormGroup({
         serviceName: new FormControl('DECORATOR', Validators.required),
         description: new FormControl('', Validators.required),
         address: new FormControl('', Validators.required),
         dateRange: new FormControl(new TuiDayRange(this.minDay, this.minDay), Validators.required),
         price: new FormControl('', [Validators.required, Validators.min(0)]),
      })

      this.subscription = activateRoute.params.subscribe(params => {
         this.masterId = params["master-id"];
      });
   }

   protected onSubmit(): void {
      if (this.masterId < 0) {
         // создание заказа без указания мастера
         this.ordersService.createOrder(
            this.readOrderByForm()
         ).subscribe({
            next: (result: string) => {
               if (result == "ok") {
                  this.error = null;
                  this.router.navigate(['client/my-orders']);
               } else {
                  console.log(`error: ${result}`);
                  this.error = result;
               }
            }
         });
      } else {
         // предложение заказа мастеру
         this.ordersService.offerOrder(
            this.readOrderByForm(), this.masterId
         ).subscribe({
            next: (result: string) => {
               if (result == "ok") {
                  this.error = null;
                  this.router.navigate(['client/my-orders']);
               } else {
                  console.log(`error: ${result}`);
                  this.error = result;
               }
            }
         });
      }
   }

   protected readOrderByForm(): Order {
      var dateRange = this.orderForm.controls['dateRange'].value;
      return {
         serviceType: this.orderForm.controls['serviceName'].value,
         description: this.orderForm.controls['description'].value,
         price: this.orderForm.controls['price'].value,
         address: this.orderForm.controls['address'].value,
         dateFrom: dateRange.from,
         dateTo: dateRange.to
      }
   }
}
