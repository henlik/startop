import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountComponent, EntryDialogContent } from './account/account.component';
import { ProfileComponent } from './profile/profile.component';
import { DemoMaterialModule } from '../demo-material-module';
import { RouterModule } from '@angular/router';
import { ComponentRoutes } from './components.routing';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
// import { SignInComponent } from './sign-in/sign-in.component';
// import { SignUpComponent } from './sign-up/sign-up.component';
// import { VerifyEmailComponent } from './verify-email/verify-email.component';



@NgModule({
  declarations: [
    AccountComponent,
    ProfileComponent,
    EntryDialogContent,
  ],
  imports: [
    CommonModule,
    DemoMaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(ComponentRoutes),
  ]
})
export class ComponentsModule { }
