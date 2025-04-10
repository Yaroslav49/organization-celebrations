import { Injectable } from "@angular/core";
import { tuiDialog } from "@taiga-ui/core";
import { AuthorizationComponent } from "../shared/authorization/authorization.component";
import { OfferLogInComponent } from "../shared/offer-log-in/offer-log-in.component";
import { AuthorizationService } from "./authorization.service";

@Injectable({ providedIn: 'root' })
export class DialogAuthorizationService {
   private readonly authDialog = tuiDialog(AuthorizationComponent, {
      dismissible: true,
      size: 's',
   });

   private readonly offerLogInDialog = tuiDialog(OfferLogInComponent, {
      dismissible: true,
      size: 's',
   });

   readonly textOfferClient: string = "Войдите в аккаунт, чтобы создать заказ";
   readonly textOfferClient2: string = "Войдите в аккаунт, чтобы предложить заказ";
   readonly textOfferMaster: string = "Войдите в аккаунт исполнителя";

   public constructor(private authService: AuthorizationService) { }

   public showAuthDialog(): void {
      this.authDialog().subscribe({
         next: (data) => {
            console.info(`Dialog emitted data = ${data}`);
         },
         complete: () => {
            console.info('Dialog closed');
         },
      });
   }

   public showOfferLogInClientDialog(): void {
      this.showOfferLogInDialog(this.textOfferClient);
   }

   public showOfferLogInClient2Dialog(): void {
      this.showOfferLogInDialog(this.textOfferClient2);
   }

   public showOfferLogInMasterDialog(): void {
      this.showOfferLogInDialog(this.textOfferMaster);
   }

   protected showOfferLogInDialog(text: string): void {
      this.offerLogInDialog(text).subscribe({
         next: (command) => {
            if (command == 'auth') {
               this.showAuthDialog();    
            }
         },
      });
   }
}