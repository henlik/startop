import { Routes } from "@angular/router";
import { AddNetComponent } from "./add-net/add-net.component";


export const TrackingRoutes: Routes = [
  {
      path: 'mildGrn',
      component: AddNetComponent,
      data: {
          title: 'MILD GRN',
          urls: [
              { title: 'MILD GRN', url: '/tracking' },
              { title: 'MILD GRN' }
          ]
      }
  }
];
