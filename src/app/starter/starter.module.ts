import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DemoMaterialModule } from '../demo-material-module';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { FlexLayoutModule } from '@angular/flex-layout';
// import { StarterComponent } from './starter.component';
import { StarterRoutes } from './starter.routing';
import { StarterComponent } from './starter.component';



@NgModule({
  imports: [
    CommonModule,
    DemoMaterialModule,
    FlexLayoutModule,
    ZXingScannerModule,
    RouterModule.forChild(StarterRoutes)
  ],
  declarations: [StarterComponent]
})
export class StarterModule {}
