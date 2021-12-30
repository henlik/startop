
import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { AppRoutes } from './app.routing';
import { AppComponent } from './app.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FullComponent } from './layouts/full/full.component';
import { AppBlankComponent } from './layouts/blank/blank.component';
import {ToastrModule} from 'ngx-toastr';
// import { QuillModule } from 'ngx-quill';
// import{QuillModule} from 'ngx-quill';

import { VerticalAppHeaderComponent } from './layouts/full/vertical-header/vertical-header.component';
import { VerticalAppSidebarComponent } from './layouts/full/vertical-sidebar/vertical-sidebar.component';
import { HorizontalAppHeaderComponent } from './layouts/full/horizontal-header/horizontal-header.component';
import { HorizontalAppSidebarComponent } from './layouts/full/horizontal-sidebar/horizontal-sidebar.component';

import { AppBreadcrumbComponent } from './layouts/full/breadcrumb/breadcrumb.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DemoMaterialModule } from './demo-material-module';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireAuthModule } from "@angular/fire/compat/auth";
import {AngularFireMessagingModule} from "@angular/fire/compat/messaging";

import { SharedModule } from './shared/shared.module';
import { SpinnerComponent } from './shared/spinner.component';

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';

import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { environment } from 'src/environments/environment';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { VerifyEmailComponent } from './components/verify-email/verify-email.component';

// scanner
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { TrackingModule } from './tracking/tracking.module';
import { ServiceWorkerModule } from '@angular/service-worker';
import { PromptComponent } from './shared/prompt/prompt.component';
import { PwaService } from './shared/pwa.service';
import { ComponentsModule } from './components/components.module';
// import { PipePipe } from './shares/pipe.pipe';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true,
  wheelSpeed: 2,
  wheelPropagation: true
};

const initilizer = (pwaService: PwaService) => () => pwaService.initPwaPrompt();

@NgModule({
  declarations: [
    AppComponent,
    FullComponent,
    VerticalAppHeaderComponent,
    SpinnerComponent,
    AppBlankComponent,
    VerticalAppSidebarComponent,
    AppBreadcrumbComponent,
    HorizontalAppHeaderComponent,
    HorizontalAppSidebarComponent,
    SignInComponent,
    ForgotPasswordComponent,
    SignUpComponent,
    VerifyEmailComponent,
    PromptComponent,
    // PipePipe,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    DemoMaterialModule,
    ReactiveFormsModule,
    FormsModule,
    FlexLayoutModule,
    PerfectScrollbarModule,
    HttpClientModule,
    SharedModule,
    TrackingModule,
    ComponentsModule,
    RouterModule.forRoot(AppRoutes),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule.enablePersistence({
      synchronizeTabs:true,
    }),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireMessagingModule,
    HttpClientModule,
    ZXingScannerModule,
    // QuillModule.forRoot(),
    ToastrModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // enabled: true,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).'registerWhenStable:30000'
      registrationStrategy: 'registerWhenStable:30000'
    })
  ],
  providers: [
    {
      provide: PERFECT_SCROLLBAR_CONFIG,

      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    },
      {
        provide: APP_INITIALIZER,
        useFactory: initilizer, deps: [PwaService],multi: true,
      }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
