import { Routes } from '@angular/router';
import { MastersComponent } from '../client/masters/masters.component';

export const routes: Routes = [
    { path: 'masters', component: MastersComponent },
    { path: '**', component: MastersComponent },
];
