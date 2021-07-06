import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';
import { FirestoreDataService } from 'src/app/core/services/firestore-data.service';

@Component({
  selector: 'app-events-dashboard',
  templateUrl: './events-dashboard.component.html',
  styleUrls: ['./events-dashboard.component.sass'],
})
export class EventsDashboardComponent implements OnInit {
  eventNames$?: Observable<any>;
  eventTypes$?: Observable<any>;
  event$!: Observable<any>;
  selectedType: string[] = [];
  constructor(public firestoreService: FirestoreDataService) {
    this.event$ = this.firestoreService
      .getEvents()
      .pipe(tap((x) => console.log(x)));
  }

  ngOnInit(): void {}
}
