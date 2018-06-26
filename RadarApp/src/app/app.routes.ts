import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './Views/login/login.component';
import { DashboardComponent } from './Views/dashboard/dashboard.component';

import { AuthGuard } from './services/auth-guard.service';

const appRoutes: Routes = [
    {
        path: '',
        component: LoginComponent
    },
    {
        path: 'dashboard',
        canActivate: [AuthGuard],
        component: DashboardComponent
    }
];

export const AppRoutes = RouterModule.forRoot(appRoutes);