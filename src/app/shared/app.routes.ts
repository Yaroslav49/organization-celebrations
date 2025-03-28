import { Routes } from '@angular/router';
import { MastersComponent } from '../client/masters/masters.component';
import { WelcomeComponent } from './welcome/welcome.component';

export const routes: Routes = [
    { path: 'masters/:category', component: MastersComponent },
    { path: '**', component: WelcomeComponent },
];
