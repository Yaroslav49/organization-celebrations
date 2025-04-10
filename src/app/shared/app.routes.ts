import { Routes } from '@angular/router';
import { MastersComponent } from '../client/masters/masters.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { CreateOrderComponent } from '../client/create-order/create-order.component';
import { MyOrdersClientComponent } from '../client/my-orders-client/my-orders-client.component';
import { RouteGuardClient } from '../services/route-guard-client.function';
import { PublicOrdersComponent } from '../master/public-orders/public-orders.component';
import { RouteGuardMaster } from '../services/route-guard-master.function';
import { MyOrdersMasterComponent } from '../master/my-orders-master/my-orders-master.component';
import { RouteGuardClientGuest } from '../services/route-guard-client-guest.function';

export const routes: Routes = [
    { path: 'masters/:category', component: MastersComponent, canActivate: [RouteGuardClientGuest] },
    { path: 'create-order/:master-id', component: CreateOrderComponent, canActivate: [RouteGuardClient] },
    { path: 'client/my-orders', component: MyOrdersClientComponent, canActivate: [RouteGuardClient] },
    { path: 'public-orders', component: PublicOrdersComponent, canActivate: [RouteGuardMaster] },
    { path: 'master/my-orders', component: MyOrdersMasterComponent, canActivate: [RouteGuardMaster] },
    { path: '**', component: WelcomeComponent, canActivate: [RouteGuardClientGuest] },
];
