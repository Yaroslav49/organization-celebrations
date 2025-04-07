import { Routes } from '@angular/router';
import { MastersComponent } from '../client/masters/masters.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { CreateOrderComponent } from '../client/create-order/create-order.component';
import { MyOrdersClientComponent } from '../client/my-orders-client/my-orders-client.component';
import { RouteGuardClient } from '../services/route-guard-client.function';

export const routes: Routes = [
    { path: 'masters/:category', component: MastersComponent },
    { path: 'create-order', component: CreateOrderComponent, canActivate: [RouteGuardClient] },
    { path: 'client/my-orders', component: MyOrdersClientComponent, canActivate: [RouteGuardClient] },
    { path: '**', component: WelcomeComponent },
];
