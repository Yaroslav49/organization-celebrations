import { Component, OnInit } from '@angular/core';
import { CardMasterComponent } from './card-master/card-master.component';
import { Master } from './model/master.model';
import { ServiceName, ServiceNameDisplay } from './model/service.model';
import { MastersService } from '../../services/masters.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MastersPage } from './model/masters-page.model';
import { AuthorizationService } from '../../services/authorization.service';

@Component({
   selector: 'app-masters',
   imports: [CardMasterComponent, RouterLink],
   providers: [MastersService],
   templateUrl: './masters.component.html',
   styleUrl: './masters.component.css'
})
export class MastersComponent {
   category: ServiceName = ServiceName.DECORATOR;
   masters: Master[] = [];

   private subscription: Subscription;

   constructor(private mastersService: MastersService, private activateRoute: ActivatedRoute, private authService: AuthorizationService) {
      this.subscription = activateRoute.params.subscribe(params => {
         this.category = params["category"];
         this.updateData();
      });
   }

   updateData() {
      this.mastersService.getMastersPage(this.category).subscribe({
         next: (data: MastersPage) => {
            this.masters = data.masters;
            if (data.photoUrl != null) {
               this.authService.photoUrl = data.photoUrl;
            }
            if (data.balance != null) {
               this.authService.balance = data.balance;
            }         
         }
      });
   }

   getServiceDisplayName(serviceName: ServiceName): string {
      return ServiceNameDisplay[serviceName];
   }
}
