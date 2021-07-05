import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { environment } from '../environments/environment';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { CoreModule } from './core/core.module';
import { EventsDashboardComponent } from './modules/eventsDashboard/dashboard/events-dashboard.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EventsDashboardModule } from './modules/eventsDashboard/events-dashboard.module';

@NgModule({
  declarations: [AppComponent, EventsDashboardComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    EventsDashboardModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    CoreModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
