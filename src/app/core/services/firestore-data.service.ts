import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { forkJoin, Observable } from 'rxjs';
import { map, switchMap, take, tap } from 'rxjs/operators';
import * as firebase from 'firebase/app';
import { Event } from '../models/Event.model';
import { EventsDashboardModule } from 'src/app/modules/eventsDashboard/events-dashboard.module';
import { filterEvents, filterEventTypes } from '../helpers/eventMapping.helper';

@Injectable({
  providedIn: 'root',
})
export class FirestoreDataService {
  constructor(private afs: AngularFirestore) {}

  getEvents(): Observable<any> {
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
        take(1)
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
        take(1)
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
        take(1)
      );
    return forkJoin([events, eventNames, eventTypes]).pipe(
      tap((x) => console.log(x)),
      map(([events, eventNames, eventTypes]) => {
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
        }),
        tap((res) => {
          console.log(res);
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

  getEventNamesById(id: number): any {
    const a = this.afs.collection('eventNames', (ref) =>
      ref.where(firebase.default.firestore.FieldPath.documentId(), '==', id)
    );
    return a.snapshotChanges().pipe(
      map((collection: any) => {
        return collection.map((doc: any) => {
          return doc.payload.doc.data();
        });
      })
    );
  }
}
