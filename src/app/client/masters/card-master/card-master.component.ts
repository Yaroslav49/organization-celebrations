import { Component, Input } from '@angular/core';
import { Master } from '../model/master.model';
import { Service, ServiceName, ServiceNameDisplay } from '../model/service.model';
import { TuiIcon, TuiButton } from '@taiga-ui/core';

@Component({
   selector: 'card-master',
   imports: [TuiIcon, TuiButton],
   templateUrl: './card-master.component.html',
   styleUrl: './card-master.component.css'
})
export class CardMasterComponent {
   @Input() master!: Master;
   @Input() category!: ServiceName;

   getServiceDisplayName(serviceName: ServiceName): string {
      return ServiceNameDisplay[serviceName];
   }

   sortServices(services: Service[]): Service[] {
      return services.sort((a: Service, b: Service) => {
         if (b.serviceName == this.category) {
            return 1;
         } else {
            return -1;
         }
      })
   }

   getMarksEnding(count: number): string {
      const lastDigit = count % 10;
      const lastTwoDigits = count % 100;

      if (lastDigit === 1 && lastTwoDigits !== 11) {
         return "оценка";
      } else if (lastDigit >= 2 && lastDigit <= 4 && (lastTwoDigits < 12 || lastTwoDigits > 14)) {
         return "оценки";
      } else {
         return "оценок";
      }
   }
}
