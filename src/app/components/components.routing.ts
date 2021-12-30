import { Routes } from "@angular/router";
import { AccountComponent } from "./account/account.component";
import { TranSingleComponent } from "./account/tran-single/tran-single.component";
import { ProductSingleComponent } from "./product/product-single/product-single.component";
import { ProductComponent } from "./product/product.component";
import { ProfileComponent } from "./profile/profile.component";
import { RequestComponent } from "./request/request.component";


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
  },
  {
    path: 'request',
    component: RequestComponent,
    data:{
      title: 'Pitch Manager',
      urls:[
        {title:'Pitch', url:'/dashboard'},
        {title: 'Pitch Manager'}
      ]
    }
  },
  {
    path: 'product',
    component: ProductComponent,
  },
  {
    path: 'product/productSingle/:id',
    component: ProductSingleComponent,
  },
  {
    path: 'account/tranSingle/:id',
    component: TranSingleComponent,
  }
]
