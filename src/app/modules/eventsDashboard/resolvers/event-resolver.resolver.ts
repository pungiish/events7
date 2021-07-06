import { Injectable } from '@angular/core';
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { take } from 'rxjs/operators';
import { FirestoreDataService } from '../../../core/services/firestore-data.service';

@Injectable({
  providedIn: 'root',
})
export class EventResolverResolver implements Resolve<boolean> {
  constructor(private firestoreService: FirestoreDataService) {}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {
    this.firestoreService.isEditing$.next(true);
    return this.firestoreService.getEvent(route.paramMap.get('id') as string);
  }
}
