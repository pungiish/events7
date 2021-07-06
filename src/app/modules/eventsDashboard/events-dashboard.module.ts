import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FirestoreDataService } from 'src/app/core/services/firestore-data.service';
import { MatTableModule } from '@angular/material/table';
import { EventsTableComponent } from './view/events-table/events-table.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [EventsTableComponent],
  imports: [CommonModule, MatTableModule, MatButtonModule, MatIconModule],
  providers: [FirestoreDataService],
  exports: [EventsTableComponent],
})
export class EventsDashboardModule {}
