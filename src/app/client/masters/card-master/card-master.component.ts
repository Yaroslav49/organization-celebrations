import { Component, inject, Input } from '@angular/core';
import { Master } from '../model/master.model';
import { Service, ServiceName, ServiceNameDisplay } from '../model/service.model';
import { TuiIcon, TuiButton, TuiDialogService } from '@taiga-ui/core';
import { Router } from '@angular/router';
import { DialogAuthorizationService } from '../../../services/dialog-authorization.service';
import { AuthorizationService } from '../../../services/authorization.service';

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

   constructor(private router: Router, private authService: AuthorizationService, protected dialogAuthService: DialogAuthorizationService) {}

   protected offerOrder() {
      if (this.authService.isLoggedIn) {
         this.router.navigate(['/create-order/', this.master.id]);
      } else {
         this.dialogAuthService.showOfferLogInClient2Dialog();
      }
   } 

   protected showDialog(url: string): void {
      this.dialogs
         .open(
            '<br><img src="' + url + '" class="big-photo" width="100%">',
            { size: 'l', data: {button: 'Закрыть'} },
         )
         .subscribe();
   }

   protected getServiceDisplayName(serviceName: ServiceName): string {
      return ServiceNameDisplay[serviceName];
   }

   protected sortServices(services: Service[]): Service[] {
      return services.sort((a: Service, b: Service) => {
         if (b.serviceName == this.category) {
            return 1;
         } else {
            return -1;
         }
      })
   }

   protected getMarksEnding(count: number): string {
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
