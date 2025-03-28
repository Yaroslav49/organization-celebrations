import { Component, inject, Input } from '@angular/core';
import { Master } from '../model/master.model';
import { Service, ServiceName, ServiceNameDisplay } from '../model/service.model';
import { TuiIcon, TuiButton, TuiDialogService } from '@taiga-ui/core';
import { Router } from '@angular/router';

@Component({
   selector: 'card-master',
   imports: [TuiIcon, TuiButton],
   templateUrl: './card-master.component.html',
   styleUrl: './card-master.component.css'
})
export class CardMasterComponent {
   @Input() master!: Master;
   @Input() category!: ServiceName;

   private readonly dialogs = inject(TuiDialogService);

   protected showDialog(url: string): void {
      this.dialogs
         .open(
            '<br><img src="' + url + '" class="big-photo" width="100%">',
            { size: 'l', data: {button: 'Закрыть'} },
         )
         .subscribe();
   }

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
