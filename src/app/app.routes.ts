import { Routes } from '@angular/router';

import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./components/landing/landing.component').then(m => m.LandingComponent),
  },
  {
    path: 'find-your-api-keys',
    loadComponent: () => import ('./components/dashboard/find-api-keys/find-apikeys.component').then(m => m.FindApiKeysComponent),
  },
  {
    path: '',
    canActivate: [ authGuard() ],
    children: [
      {
        path: 'dashboard',
        loadComponent: () => import('./components/dashboard/dashboard.component').then(m => m.DashboardComponent),
      },
      {
        path: 'tournaments',
        loadComponent: () => import('./components/tournaments/tournament.component').then(m => m.TournamentComponent),
      },
      {
        path: 'tournaments/:title',
        loadComponent: () => import('./components/tournaments/single-view/single-view-tournament.component').then(m => m.SingleViewTournamentComponent),
      }
    ]
  },

  {
    path: 'users',
    canActivate: [ authGuard(true) ],
    loadComponent: () => import('./components/admin/users/users.component').then(m => m.UsersComponent),
    data: { pageName: 'Users' },
  },
  {
    path: 'user/:id',
    canActivate: [ authGuard(true) ],
    loadComponent: () => import('./components/admin/users/users.component').then(m => m.UsersComponent),
    data: { pageName: 'User' },
  }
];

export class AppRoutingModule { }
