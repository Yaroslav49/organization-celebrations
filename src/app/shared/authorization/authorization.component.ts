import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TuiButton, TuiDialogContext, TuiDialogService } from '@taiga-ui/core';
import { TuiInputModule } from '@taiga-ui/legacy';
import { AuthorizationService } from '../../services/authorization.service';
import { Router } from '@angular/router';
import { injectContext } from '@taiga-ui/polymorpheus';
import { Role } from '../../services/role.model';

@Component({
   selector: 'authorization',
   imports: [TuiButton, TuiInputModule, ReactiveFormsModule],
   providers: [TuiDialogService],
   templateUrl: './authorization.component.html',
   styleUrl: './authorization.component.css',
   changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthorizationComponent {
   authForm: FormGroup = new FormGroup({
      login: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
   })
   authError: boolean = false;

   readonly context = injectContext<TuiDialogContext<void,void>>();

   constructor(private authService: AuthorizationService, private router: Router) { }

   protected onSubmit():void {
      this.authService.login(
         this.authForm.controls['login'].value, this.authForm.controls['password'].value
      ).subscribe({
         next: (result: boolean) => {
            if (result) {
               this.authError = false;
               if (this.authService.role == Role.MASTER) {
                  this.router.navigate(['/public-orders']);
               }
               this.context.completeWith();
            } else {
               this.authError = true;
               let errorMessage: HTMLElement | null = document.getElementById('error');
               if (errorMessage) {
                  errorMessage.textContent = 'Ошибка: аккаунт с таким логином и паролем не найден';
               }            
               console.log('authError!');
            }
         }
      });
   }

   protected isAuthenticated(): boolean {
      return this.authService.isAuthenticated();
   } 
}