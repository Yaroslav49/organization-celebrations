import { CanActivateFn, Router } from "@angular/router";
import { AuthorizationService } from "./authorization.service";
import { inject } from "@angular/core";
import { Role } from "./role.model";

export const RouteGuardClient: CanActivateFn = () => {
   var role: Role = inject(AuthorizationService).role;
   var router = inject(Router);

   if (role == Role.CLIENT) {
      return true;
   } else {
      router.navigate(['']);
      return false;
   }
}