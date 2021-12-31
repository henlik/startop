import { Routes } from '@angular/router';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { VerifyEmailComponent } from './components/verify-email/verify-email.component';

import { FullComponent } from './layouts/full/full.component';
import { AuthGuard } from './shared/guard/auth.guard';
import { RevokeGuard } from './shared/guard/revoke.guard';

export const AppRoutes: Routes = [
    {
        path: '',
        component: FullComponent,
        canActivate: [AuthGuard],
        children: [
            {
                path: '',
                redirectTo: '/component/product',
                pathMatch: 'full',


            },
            {
                path: 'dashboard',
                loadChildren: () => import('./starter/starter.module').then(m => m.StarterModule)
            },
            {
              path:'startapp',
              loadChildren:() => import('./startapp/startapp.module').then(m => m.StartappModule)
            },
            {
              path:'tracking',
              loadChildren:() => import('./tracking/tracking.module').then(m => m.TrackingModule)
            },
            {
              path:'component',
              loadChildren:() => import('./components/components.module').then(m => m.ComponentsModule)
            }
        ]
    },
    {
      path:'login',
      component: SignInComponent,
      canActivate: [RevokeGuard],
    },
    {
      path: 'register',
      component: SignUpComponent,
      canActivate: [RevokeGuard],
    },
    {
      path:'forgot-password',
      component: ForgotPasswordComponent,
      canActivate: [RevokeGuard],
    },
    {
      path:'verify-email',
      component: VerifyEmailComponent,
      canActivate: [RevokeGuard],
    }
];
