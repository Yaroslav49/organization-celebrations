import { Component, OnInit } from '@angular/core';
import { CardMasterComponent } from './card-master/card-master.component';
import { Master } from './model/master.model';
import { ServiceName, ServiceNameDisplay } from './model/service.model';
import { MastersService } from '../../services/masters.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MastersPage } from './model/masters-page.model';

@Component({
   selector: 'app-masters',
   imports: [CardMasterComponent, RouterLink],
   providers: [MastersService],
   templateUrl: './masters.component.html',
   styleUrl: './masters.component.css'
})
export class MastersComponent implements OnInit {
   category: ServiceName = ServiceName.DECORATOR;
   masters: Master[] = [{
      id: 0, fullName: "Ярослав Зверев", description: "Меня зовут Ярослав! Я являюсь профессиональным официантом уже более 0 лет",
      onlineStatus: true,
      photos: [], personalPhoto: "https://i.ibb.co/twm8db1n/Avatar-big.png", averageRating: 4.2,
      ratingCount: 8, passportVerified: false, contractWork: false, services: [
         { serviceName: ServiceName.WAITER, cost: 300 },
         { serviceName: ServiceName.CHEF, cost: 350 },
         { serviceName: ServiceName.DECORATOR, cost: 400 }
      ], districts: ["Железнодорожный р-н"]
   },
   {
      id: 1, fullName: "Ярослав Зверев", description: "Меня зовут Ярослав! Я являюсь профессиональным официантом уже более 0 лет",
      onlineStatus: true,
      photos: [], personalPhoto: "https://i.ibb.co/twm8db1n/Avatar-big.png", averageRating: 4.2,
      ratingCount: 8, passportVerified: true, contractWork: true, services: [
         { serviceName: ServiceName.WAITER, cost: 300 }
      ], districts: ["Железнодорожный р-н", "Московский р-н"]
   },
   {
      id: 2, fullName: "Ярослав Зверев", description: "Меня зовут Ярослав! Я являюсь профессиональным официантом уже более 0 лет",
      onlineStatus: true,
      photos: [
         "https://i.ibb.co/nNPRdy9w/image.png",
         "https://i.ibb.co/nNPRdy9w/image.png",
         "https://i.ibb.co/nNPRdy9w/image.png",
         "https://i.ibb.co/nNPRdy9w/image.png",
         "https://i.ibb.co/nNPRdy9w/image.png",
         "https://i.ibb.co/nNPRdy9w/image.png",
         "https://i.ibb.co/nNPRdy9w/image.png",
         "https://i.ibb.co/nNPRdy9w/image.png",
         "https://i.ibb.co/nNPRdy9w/image.png",
         "https://i.ibb.co/nNPRdy9w/image.png",
      ], personalPhoto: "https://i.ibb.co/twm8db1n/Avatar-big.png", averageRating: 4.2,
      ratingCount: 8, passportVerified: true, contractWork: true, services: [
         { serviceName: ServiceName.WAITER, cost: 300 }
      ], districts: ["Железнодорожный р-н", "Московский р-н"]
   }];

   photoUrl: string = "@tui.user";

   private subscription: Subscription;

   constructor(private mastersService: MastersService, private activateRoute: ActivatedRoute) {
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
               this.photoUrl = data.photoUrl;
            }           
         }
      });
   }

   ngOnInit() {
      this.updateData();
   }

   getServiceDisplayName(serviceName: ServiceName): string {
      return ServiceNameDisplay[serviceName];
   }
}
