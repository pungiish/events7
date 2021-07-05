import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-events-table',
  templateUrl: './events-table.component.html',
  styleUrls: ['./events-table.component.sass']
})
export class EventsTableComponent implements OnInit {
  @Input() eventTypes!: [];
  @Input() eventNames!: [];
  constructor() { }

  ngOnInit(): void {
  }

}
