import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventsDashboardComponent } from './modules/eventsDashboard/dashboard/events-dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: EventsDashboardComponent,
    loadChildren: () => import('./modules/eventsDashboard/events-dashboard.module').then(m => m.EventsDashboardModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
