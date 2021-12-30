import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AccountComponent} from './account/account.component';
import { RequestComponent, RequestDialogContent } from './request/request.component';
import { ProfileComponent } from './profile/profile.component';
import { DemoMaterialModule } from '../demo-material-module';
import { RouterModule } from '@angular/router';
import { ComponentRoutes } from './components.routing';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ProductComponent} from './product/product.component';
import { PipePipe } from '../shares/pipe.pipe';
import { NgApexchartsModule } from 'ng-apexcharts';
import { YouTubePlayerModule } from '@angular/youtube-player';
import { ProductSingleComponent } from './product/product-single/product-single.component';
import { TranSingleComponent } from './account/tran-single/tran-single.component';
// import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
// import { SignInComponent } from './sign-in/sign-in.component';
// import { SignUpComponent } from './sign-up/sign-up.component';
// import { VerifyEmailComponent } from './verify-email/verify-email.component';



@NgModule({
  declarations: [
    AccountComponent,
    ProfileComponent,
    RequestComponent,
    RequestDialogContent,
    ProductComponent,
    PipePipe,
    ProductSingleComponent,

    TranSingleComponent,
  ],
  imports: [
    CommonModule,
    DemoMaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    YouTubePlayerModule,
    NgApexchartsModule,
    RouterModule.forChild(ComponentRoutes),
  ]
})
export class ComponentsModule { }
