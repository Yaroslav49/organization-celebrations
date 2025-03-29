import { Component } from '@angular/core';
import { TuiButton, tuiDialog } from '@taiga-ui/core';
import { AuthorizationComponent } from '../authorization/authorization.component';
import { AuthorizationService } from '../../services/authorization.service';
import { RouterLink } from '@angular/router';

@Component({
   selector: 'app-header',
   imports: [TuiButton, RouterLink],
   templateUrl: './header.component.html',
   styleUrl: './header.component.css'
})
export class HeaderComponent {
   public constructor(private authService: AuthorizationService) {}

   private readonly authDialog = tuiDialog(AuthorizationComponent, {
      dismissible: true,
      size: 's',
   });

   protected isAuthenticated(): boolean {
      return this.authService.isAuthenticated();
   }

   protected showDialog(): void {
      this.authDialog().subscribe({
         next: (data) => {
            console.info(`Dialog emitted data = ${data}`);
         },
         complete: () => {
            console.info('Dialog closed');
         },
      });
   }
}
