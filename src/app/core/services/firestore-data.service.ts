import { getLocaleFirstDayOfWeek } from '@angular/common';
import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
} from 'angularfire2/firestore';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { filter, map, mergeMap, switchMap, tap } from 'rxjs/operators';
import * as firebase from 'firebase/app';

@Injectable({
  providedIn: 'root',
})
export class FirestoreDataService {
  constructor(private afs: AngularFirestore) {
  }
  
  getEventNames(): Observable<Array<{name: string, id: string}>> {
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
          console.log(res)
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
