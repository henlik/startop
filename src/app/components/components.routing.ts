import { Routes } from "@angular/router";
import { AccountComponent } from "./account/account.component";
import { ProfileComponent } from "./profile/profile.component";


export const ComponentRoutes: Routes = [
  {
    path: 'account',
    component: AccountComponent,
    data:{
      title: 'Account',
      urls:[
        {title:'Account', url:'/dashboard'},
        {title: 'Account Manager'}
      ]
    }
  },
  {
    path: 'profile',
    component: ProfileComponent,
    data:{
      title: 'Profile',
      urls:[
        {title:'Profile', url:'/dashboard'},
        {title: 'Profile Manager'}
      ]
    }
  }
]
