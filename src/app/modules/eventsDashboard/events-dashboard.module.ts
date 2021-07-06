import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FirestoreDataService } from 'src/app/core/services/firestore-data.service';
import { MatTableModule } from '@angular/material/table';
import { EventsTableComponent } from './view/events-table/events-table.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { EventsDashboardRoutingModule } from './events-dashboard-routing.module';
import { NewEventDashboardComponent } from './new/new-event/new-event-dashboard.component.';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [EventsTableComponent, NewEventDashboardComponent],
  imports: [
    CommonModule,
    EventsDashboardRoutingModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    ReactiveFormsModule
  ],
  exports: [EventsTableComponent],
})
export class EventsDashboardModule {}
