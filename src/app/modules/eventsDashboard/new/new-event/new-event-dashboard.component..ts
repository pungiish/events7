import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Event, IEventName, IEventType } from 'src/app/core/models/Event.model';
import { FirestoreDataService } from 'src/app/core/services/firestore-data.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { map, tap } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-new-event-dashboard',
  templateUrl: './new-event-dashboard.component.html',
  styleUrls: ['./new-event-dashboard.component.sass'],
})
export class NewEventDashboardComponent implements OnInit {
  eventType$!: Observable<IEventType[]>;
  eventName$!: Observable<IEventName[]>;
  eventTypes: IEventType[] = [];
  eventForm: FormGroup;
  event?: Event;
  relatedEventIds: string[] = [];
  constructor(
    private firestoreService: FirestoreDataService,
    private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.eventForm = this.fillForm();
  }

  ngOnInit(): void {
    if (this.firestoreService.isEditing$.value) {
      this.activatedRoute.data.subscribe((data) => {
        this.event = data.event;
      });
      this.eventForm = this.fillForm();
    }

    this.eventType$ = this.firestoreService.getEventTypes().pipe(
      tap((eventTypes) => {
        this.eventTypes = eventTypes;
        this.relatedEventIds = this.getRelatedEventIds(
          this.event?.type as string
        );
      })
    );
    this.eventName$ = this.firestoreService
      .getEventNames()
      .pipe(
        map(
          (eventNames) =>
            (eventNames = eventNames.filter((x) =>
              this.relatedEventIds.includes(x.id)
            ))
        )
      );
  }

  onTypeSelect(event: any) {
    let relatedEventIds = this.getRelatedEventIds(event);
    this.eventForm.get('relatedEvents')?.reset([]);
    this.eventName$ = this.firestoreService
      .getEventNames()
      .pipe(
        map(
          (eventNames) =>
            (eventNames = eventNames.filter((x) =>
              relatedEventIds?.includes(x.id)
            ))
        )
      );
  }

  fillForm(): FormGroup {
    return this.fb.group({
      id: this.fb.control(this.event ? this.event.id : []),
      name: this.fb.control(
        this.event ? this.event.name : [],
        Validators.required
      ),
      description: this.fb.control(
        this.event ? this.event.description : [],
        Validators.required
      ),
      type: this.fb.control(
        this.event ? this.event.type : [],
        Validators.required
      ),
      priority: this.fb.control(
        this.event ? this.event.priority : [0],
        Validators.required
      ),
      relatedEvents: this.fb.control(
        this.event
          ? this.event.relatedEvents.map(
              (relatedEvent) => (relatedEvent as IEventName).id
            )
          : []
      ),
    });
  }

  getRelatedEventIds(eventId: string): string[] {
    let foundEventNames = this.eventTypes.find(
      (type) => type.id == eventId
    )?.eventNameIds;
    if (foundEventNames) {
      return foundEventNames;
    } else {
      return [];
    }
  }

  onSubmit() {
    if (!this.eventForm.invalid) {
      if (this.firestoreService.isEditing$.value) {
        this.firestoreService.updateEvent({ ...this.eventForm.value });
      } else {
        this.firestoreService.createEvent({ ...this.eventForm.value });
      }
      this.router.navigate(['']);
    }
  }
}
