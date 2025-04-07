import { Component } from '@angular/core';
import { TuiButton, TuiDialogContext, TuiIcon } from '@taiga-ui/core';
import { injectContext } from '@taiga-ui/polymorpheus';

@Component({
   selector: 'app-offer-log-in',
   imports: [TuiButton, TuiIcon],
   templateUrl: './offer-log-in.component.html',
   styleUrl: './offer-log-in.component.css'
})
export class OfferLogInComponent {
   readonly context = injectContext<TuiDialogContext<string, string>>();

   protected goAuthorization(): void {
      this.context.completeWith('auth');
   }
}
