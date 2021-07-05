import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FirestoreDataService } from 'src/app/core/services/firestore-data.service';
import { MatTableModule } from '@angular/material/table';
import { EventsTableComponent } from './view/events-table/events-table.component';

@NgModule({
  declarations: [EventsTableComponent],
  imports: [CommonModule, MatTableModule],
  providers: [FirestoreDataService],
  exports: [EventsTableComponent],
})
export class EventsDashboardModule {}
