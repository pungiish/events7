import { Component, Input, OnInit } from '@angular/core';
import { Event, IEventName, IEventType } from 'src/app/core/models/Event.model';

@Component({
  selector: 'app-events-table',
  templateUrl: './events-table.component.html',
  styleUrls: ['./events-table.component.sass'],
})
export class EventsTableComponent implements OnInit {
  @Input() eventsData!: {
    events: Event[];
    eventTypes: IEventType[];
    eventNames: IEventName[];
  };
  displayedColumns: string[] = ['name', 'description', 'type', 'priority', 'relatedEvents', 'actions'];
  clickedRows = new Set<Event>();
  constructor() {}
  ngOnInit(): void {}

  onEditClick(element: Event) {
    console.log(element)
  }

  onDeleteClick(element: Event) {
    console.log(element)
  }
}
