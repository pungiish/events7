import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventsDashboardComponent } from './modules/eventsDashboard/dashboard/events-dashboard.component';

const routes: Routes = [
  {
    path: 'events',
    component: EventsDashboardComponent,
    loadChildren: () =>
      import('./modules/eventsDashboard/events-dashboard.module').then(
        (m) => m.EventsDashboardModule
      ),
  },
  {
    path: '',
    redirectTo: 'events',
    pathMatch: 'prefix',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
