import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { BehaviorSubject, combineLatest, Observable, of } from 'rxjs';
import { catchError, map, shareReplay, take } from 'rxjs/operators';
import { Event, IEvent, IEventName, IEventType } from '../models/Event.model';
import { filterEvents } from '../helpers/eventMapping.helper';

@Injectable({
  providedIn: 'root',
})
export class FirestoreDataService {
  selectedEvent$ = new BehaviorSubject<IEvent | null>(null);
  eventName$ = new BehaviorSubject<IEventName[] | null>(null);
  eventType$ = new BehaviorSubject<IEventType[] | null>(null);
  isEditing$ = new BehaviorSubject<boolean>(false);
  constructor(private afs: AngularFirestore) {}

  getEvents(): Observable<{
    events: Event[];
    eventTypes: IEventType[];
    eventNames: IEventName[];
  }> {
    let events = this.afs
      .collection('events')
      .snapshotChanges()
      .pipe(
        map((collection) => {
          return collection.map((doc: any) => {
            let document = doc.payload.doc;
            return {
              ...new Event(document.id, document.data()),
            };
          });
        }),
        catchError((err) => {
          console.log(err);
          return of(err);
        })
      );
    let eventNames = this.afs
      .collection('eventNames')
      .snapshotChanges()
      .pipe(
        map((collection: any) => {
          return collection.map((doc: any) => {
            return {
              id: doc.payload.doc.id,
              name: doc.payload.doc.data().name,
            };
          });
        }),
        shareReplay(2),
        catchError((err) => {
          console.log(err);
          return of(err);
        })
      );
    let eventTypes = this.afs
      .collection('eventTypes', (ref) => ref.orderBy('name'))
      .snapshotChanges()
      .pipe(
        map((collection: any) => {
          return collection.map((doc: any) => {
            return {
              id: doc.payload.doc.id,
              name: doc.payload.doc.data().name,
              eventNameIds: doc.payload.doc
                .data()
                ['related-events'].map((relatedRef: any) => {
                  return relatedRef.id;
                }),
            };
          });
        }),
        shareReplay(2),
        catchError((err) => {
          console.log(err);
          return of(err);
        })
      );
    return combineLatest([events, eventNames, eventTypes]).pipe(
      map(([events, eventNames, eventTypes]) => {
        this.eventName$.next(eventNames);
        this.eventType$.next(eventTypes);
        events = filterEvents(events, eventTypes, eventNames);
        return { events, eventNames, eventTypes };
      })
    );
  }

  getEventNames(): Observable<Array<{ name: string; id: string }>> {
    return this.afs
      .collection('eventNames')
      .snapshotChanges()
      .pipe(
        map((collection: any) => {
          return collection.map((doc: any) => {
            return {
              id: doc.payload.doc.id,
              name: doc.payload.doc.data().name,
            };
          });
        })
      );
  }

  getEventTypes(): Observable<any> {
    return this.afs
      .collection('eventTypes', (ref) => ref.orderBy('name'))
      .snapshotChanges()
      .pipe(
        map((collection: any) => {
          return collection.map((doc: any) => {
            return {
              id: doc.payload.doc.id,
              name: doc.payload.doc.data().name,
              eventNameIds: doc.payload.doc
                .data()
                ['related-events'].map((relatedRef: any) => {
                  return relatedRef.id;
                }),
            };
          });
        })
      );
  }

  createEvent(event: Event): void {
    event.relatedEvents = event.relatedEvents.map((relatedEventId) => {
      return this.afs.firestore.doc('eventNames/' + relatedEventId) as any;
    });
    event.type = this.afs.firestore.doc('eventTypes/' + event.type) as any;
    this.afs
      .collection('events')
      .add({ ...event })
      .catch((err) => {
        console.error(err);
      });
  }

  updateEvent(event: Event): void {
    event.relatedEvents = event.relatedEvents.map((relatedEventId) => {
      return this.afs.firestore.doc('eventNames/' + relatedEventId) as any;
    });
    event.type = this.afs.firestore.doc('eventTypes/' + event.type) as any;
    this.afs
      .collection('events')
      .doc(event.id as string)
      .update({ ...event })
      .catch((err) => {
        console.error(err);
      });
  }

  deleteEvent(eventId: string): void {
    this.afs.firestore
      .doc(`events/` + eventId)
      .delete()
      .catch((err) => console.log(err));
  }

  getEvent(eventId: string) {
    return this.afs
      .collection('events')
      .doc(eventId)
      .get()
      .pipe(
        map((event) => {
          return {
            ...new Event(event.id, event.data()),
          };
        }),
        take(1)
      );
  }
}
