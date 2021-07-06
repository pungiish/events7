"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppModule = void 0;
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var app_routing_module_1 = require("./app-routing.module");
var app_component_1 = require("./app.component");
var environment_1 = require("../environments/environment");
var fire_1 = require("@angular/fire");
var firestore_1 = require("@angular/fire/firestore");
var core_module_1 = require("./core/core.module");
var events_dashboard_component_1 = require("./modules/eventsDashboard/dashboard/events-dashboard.component");
var animations_1 = require("@angular/platform-browser/animations");
var events_dashboard_module_1 = require("./modules/eventsDashboard/events-dashboard.module");
var firestore_data_service_1 = require("./core/services/firestore-data.service");
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            declarations: [app_component_1.AppComponent, events_dashboard_component_1.EventsDashboardComponent],
            imports: [
                platform_browser_1.BrowserModule,
                app_routing_module_1.AppRoutingModule,
                events_dashboard_module_1.EventsDashboardModule,
                fire_1.AngularFireModule.initializeApp(environment_1.environment.firebase),
                firestore_1.AngularFirestoreModule,
                core_module_1.CoreModule,
                animations_1.BrowserAnimationsModule,
            ],
            providers: [firestore_data_service_1.FirestoreDataService],
            bootstrap: [app_component_1.AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
