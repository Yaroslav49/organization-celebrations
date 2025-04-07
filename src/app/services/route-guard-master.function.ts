import { CanActivateFn, Router } from "@angular/router";
import { AuthorizationService } from "./authorization.service";
import { Role } from "./role.model";
import { inject } from "@angular/core";

export const RouteGuardMaster: CanActivateFn = () => {
    var role: Role = inject(AuthorizationService).role;
    var router = inject(Router);
    console.log(role);
 
    if (role == Role.MASTER) {
       return true;
    } else {
       router.navigate(['']);
       return false;
    }
 }