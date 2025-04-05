import { Routes } from '@angular/router';
import { MastersComponent } from '../client/masters/masters.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { CreateOrderComponent } from '../client/create-order/create-order.component';

export const routes: Routes = [
    { path: 'masters/:category', component: MastersComponent },
    { path: 'create-order', component: CreateOrderComponent },
    { path: '**', component: WelcomeComponent },
];
