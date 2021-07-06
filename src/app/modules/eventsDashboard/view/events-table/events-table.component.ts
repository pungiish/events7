import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import {
  Event,
  IEvent,
  IEventName,
  IEventType,
} from 'src/app/core/models/Event.model';
import { FirestoreDataService } from 'src/app/core/services/firestore-data.service';

@Component({
  selector: 'app-events-table',
  templateUrl: './events-table.component.html',
  styleUrls: ['./events-table.component.sass'],
})
export class EventsTableComponent implements OnInit {
  eventsData$!: Observable<{
    events: Event[];
    eventTypes: IEventType[];
    eventNames: IEventName[];
  }>;
  displayedColumns: string[] = [
    'name',
    'description',
    'type',
    'priority',
    'relatedEvents',
    'actions',
  ];
  clickedRows = new Set<Event>();
  constructor(
    public firestoreService: FirestoreDataService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.firestoreService.isEditing$.next(false);
    this.eventsData$ = this.firestoreService.getEvents();
  }

  onEditClick(event: Event) {
    this.firestoreService.selectedEvent$.next(event);
    this.router.navigate(['edit', event.id]);
  }

  onDeleteClick(eventId: string) {
    this.firestoreService.deleteEvent(eventId);
  }
}
