import { Component, HostListener } from '@angular/core';
import { TuiButton, tuiDialog, TuiIcon } from '@taiga-ui/core';
import { TuiAvatar } from '@taiga-ui/kit';
import { AuthorizationComponent } from '../authorization/authorization.component';
import { AuthorizationService } from '../../services/authorization.service';
import { RouterLink } from '@angular/router';
import { UserInfoComponent } from '../user-info/user-info.component';
import { Role } from '../../services/role.model';

@Component({
   selector: 'app-header',
   imports: [TuiButton, TuiAvatar, TuiIcon, RouterLink, UserInfoComponent],
   templateUrl: './header.component.html',
   styleUrl: './header.component.css'
})
export class HeaderComponent {

   Role = Role;

   private readonly authDialog = tuiDialog(AuthorizationComponent, {
      dismissible: true,
      size: 's',
   });

   isUserInfoVisible = false;

   public constructor(private authService: AuthorizationService) { }

   toggleUserInfo() {
      this.isUserInfoVisible = !this.isUserInfoVisible;
   }

   isAuthenticated(): boolean {
      return this.authService.isAuthenticated();
   }

   getPhotoUrl(): string {
      return this.authService.photoUrl;
   }

   getUserRole(): Role {
      return this.authService.role;
   }

   protected showAuthDialog(): void {
      this.authDialog().subscribe({
         next: (data) => {
            console.info(`Dialog emitted data = ${data}`);
         },
         complete: () => {
            console.info('Dialog closed');
         },
      });
   }

   protected logout(): void {
      this.authService.logout();
   }

   @HostListener('document:click', ['$event'])
   handleClickOutside(event: MouseEvent) {
      const target = event.target as HTMLElement;
      if (!target.closest('user-info') && !target.closest('.vertical-popup-list')) {
         this.isUserInfoVisible = false;
      }
   }
}
