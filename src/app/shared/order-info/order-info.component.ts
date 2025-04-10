import { Component, Input } from '@angular/core';
import { Order } from '../../client/model/order.model';
import { ServiceName, ServiceNameDisplay } from '../../client/masters/model/service.model';
import { TuiIcon } from '@taiga-ui/core';

@Component({
   selector: 'order-info',
   imports: [TuiIcon],
   templateUrl: './order-info.component.html',
   styleUrl: './order-info.component.css'
})
export class OrderInfoComponent {
   @Input() order!: Order;
   @Input() isClient!: boolean;

   getServiceDisplayName(serviceName: ServiceName): string {
      return ServiceNameDisplay[serviceName];
   }

   getName(): string | null {
      if (this.isClient && this.order.nameMaster) {
         if (this.order.nameMaster == "Мастер не назначен") {
            return "Исполнитель: не назначен";
         }
         return `Исполнитель: ${this.order.nameMaster}`;
      } else if (!this.isClient && this.order.nameClient) {
         return `Заказчик: ${this.order.nameClient}`;
      } else {
         return null;
      }
   }

   getPhone(): string | null {
      if (this.isClient && this.order.phoneMaster) {
         return this.order.phoneMaster;
      } else if (!this.isClient && this.order.phoneClient) {
         return this.order.phoneClient;
      } else {
         return null;
      }
   }

   formatDateRange(dateFrom: string, dateTo: string): string {
      const startDate: Date = new Date(dateFrom);
      const endDate: Date = new Date(dateTo);

      const startYear: number = startDate.getFullYear();
      const endYear: number = endDate.getFullYear();

      if (startYear == endYear) {
         const startDay: number = startDate.getDate();
         const endDay: number = endDate.getDate();
         const startMonth: number = startDate.getMonth();  //toLocaleString('ru-RU', { month: 'long' });
         const endMonth: number = endDate.getMonth();  //toLocaleString('ru-RU', { month: 'long' });
         let result: string;

         if (startMonth == endMonth) {
            if (startDay == endDay) {
               let date: string = startDate.toLocaleString('ru-RU', { day: 'numeric', month: 'long' });
               result = `${date}`; // диапазон из одного дня
            } else {
               let date: string = endDate.toLocaleString('ru-RU', { day: 'numeric', month: 'long' });
               result = `${startDay} - ${date}`; // диапазон из одного месяца
            }
         } else {
            result = `${startDay} ${startMonth} - ${endDay} ${endMonth}`; // диапазон из разных месяцев
         }

         if (startYear != new Date().getFullYear()) {
            result += ` ${startDate.getFullYear()}`;
         }
         return result;

      } else {
         let date1: string = startDate.toLocaleString('ru-RU', { day: 'numeric', month: 'numeric', year: '2-digit' });
         let date2: string = endDate.toLocaleString('ru-RU', { day: 'numeric', month: 'numeric', year: '2-digit' });
         return `${date1} - ${date2}`; // диапазон из разных годов
      }

   }
}
