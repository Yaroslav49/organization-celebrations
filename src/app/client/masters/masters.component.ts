import { Component } from '@angular/core';
import { HeaderComponent } from '../../shared/header/header.component';
import { CardMasterComponent } from './card-master/card-master.component';
import { Master } from './model/master.model';
import { ServiceName } from './model/service.model';

@Component({
  selector: 'app-masters',
  imports: [HeaderComponent, CardMasterComponent],
  templateUrl: './masters.component.html',
  styleUrl: './masters.component.css'
})
export class MastersComponent {
  masters: Master[] = [
    {id: 0, fullName: "Ярослав Зверев", description: "Меня зовут Ярослав! Я являюсь профессиональным официантом уже более 0 лет", 
      onlineStatus: true, 
      photos: [], personalPhoto: "https://i.ibb.co/twm8db1n/Avatar-big.png", averageRating: 4.2,
      ratingCount: 8, passportVerified: false, contractWork: false, services: [
        {serviceName: ServiceName.WAITER, cost: 300}
      ], districts: ["Железнодорожный р-н"]
    },
    {id: 0, fullName: "Ярослав Зверев", description: "Меня зовут Ярослав! Я являюсь профессиональным официантом уже более 0 лет", 
      onlineStatus: true, 
      photos: [], personalPhoto: "https://i.ibb.co/twm8db1n/Avatar-big.png", averageRating: 4.2,
      ratingCount: 8, passportVerified: true, contractWork: true, services: [
        {serviceName: ServiceName.WAITER, cost: 300}
      ], districts: ["Железнодорожный р-н", "Московский р-н"]
    },
    {id: 0, fullName: "Ярослав Зверев", description: "Меня зовут Ярослав! Я являюсь профессиональным официантом уже более 0 лет", 
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
        {serviceName: ServiceName.WAITER, cost: 300}
      ], districts: ["Железнодорожный р-н", "Московский р-н"]
    }
  ]
}
