import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TuiButton, TuiDialogContext, TuiDialogService } from '@taiga-ui/core';
import { TuiInputModule } from '@taiga-ui/legacy';
import { AuthorizationService } from '../../services/authorization.service';
import { Router } from '@angular/router';
import {injectContext} from '@taiga-ui/polymorpheus';

@Component({
   selector: 'authorization',
   imports: [TuiButton, TuiInputModule, ReactiveFormsModule],
   providers: [TuiDialogService, AuthorizationService],
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

   constructor(private authService: AuthorizationService, private router: Router) { }

   public readonly context = injectContext<TuiDialogContext<void,void>>();

   protected onSubmit():void {
      this.authService.login(
         this.authForm.controls['login'].value, this.authForm.controls['password'].value
      ).subscribe({
         next: (result: boolean) => {
            if (result) {
               this.authError = false;
               this.context.completeWith();
               console.log(Boolean(this.router.navigate(["/open"])));
            } else {
               this.authError = true;
            }
         }
      });
   }

   protected isAuthenticated(): boolean {
      return this.authService.isAuthenticated();
   }
}