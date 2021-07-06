import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EventResolverResolver } from 'src/app/modules/eventsDashboard/resolvers/event-resolver.resolver';
import { NewEventDashboardComponent } from './new/new-event/new-event-dashboard.component.';
import { EventsTableComponent } from './view/events-table/events-table.component';

const routes: Routes = [
  {
    path: '',
    component: EventsTableComponent,
    children: [],
  },
  {
    path: 'new',
    component: NewEventDashboardComponent,
  },
  {
    path: 'edit/:id',
    component: NewEventDashboardComponent,
    resolve: {
      event: EventResolverResolver,
    },
  },
  {
    path: 'edit',
    component: NewEventDashboardComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EventsDashboardRoutingModule {}
