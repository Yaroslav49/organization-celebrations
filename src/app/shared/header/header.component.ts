import { Component, HostListener } from '@angular/core';
import { TuiButton, TuiIcon } from '@taiga-ui/core';
import { TuiAvatar } from '@taiga-ui/kit';
import { AuthorizationService } from '../../services/authorization.service';
import { RouterLink } from '@angular/router';
import { UserInfoComponent } from '../user-info/user-info.component';
import { Role } from '../../services/role.model';
import { DialogAuthorizationService } from '../../services/dialog-authorization.service';

@Component({
   selector: 'app-header',
   imports: [TuiButton, TuiAvatar, TuiIcon, RouterLink, UserInfoComponent],
   templateUrl: './header.component.html',
   styleUrl: './header.component.css'
})
export class HeaderComponent {

   Role = Role;

   isUserInfoVisible = false;

   public constructor(private authService: AuthorizationService, protected dialogAuthService: DialogAuthorizationService) { }

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

   @HostListener('document:click', ['$event'])
   handleClickOutside(event: MouseEvent) {
      const target = event.target as HTMLElement;
      if (!target.closest('user-info') && !target.closest('.vertical-popup-list')) {
         this.isUserInfoVisible = false;
      }
   }
}
