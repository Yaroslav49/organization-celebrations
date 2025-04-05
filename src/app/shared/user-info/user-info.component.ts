import { Component } from '@angular/core';
import { AuthorizationService } from '../../services/authorization.service';
import { TuiButton } from '@taiga-ui/core';

@Component({
   selector: 'user-info',
   imports: [TuiButton],
   templateUrl: './user-info.component.html',
   styleUrl: './user-info.component.css'
})
export class UserInfoComponent {
   public constructor(private authService: AuthorizationService) { }

   getUserLogin(): string {
      return this.authService.loginName;
   }

   getBalance(): number {
      return this.authService.balance;
   }

   protected logout(): void {
      this.authService.logout();
   }
}
