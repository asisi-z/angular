import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { Dashboard } from './pages/dashboard/dashboard';
import { Home } from './pages/home/home';
import { authGuard } from './auth/auth-guard';

export const routes: Routes = [
    {path: "", redirectTo: "login", pathMatch: "full"},
    {path: "login", component:Login},
    {path: "dashboard", component:Dashboard, canActivate: [authGuard]},
    {path: "home", component:Home, canActivate: [authGuard] },
    
];

