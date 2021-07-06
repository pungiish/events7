"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.EventsDashboardRoutingModule = void 0;
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var event_resolver_resolver_1 = require("src/app/modules/eventsDashboard/resolvers/event-resolver.resolver");
var new_event_dashboard_component_1 = require("./new/new-event/new-event-dashboard.component.");
var events_table_component_1 = require("./view/events-table/events-table.component");
var routes = [
    {
        path: '',
        component: events_table_component_1.EventsTableComponent,
        children: []
    },
    {
        path: 'new',
        component: new_event_dashboard_component_1.NewEventDashboardComponent
    },
    {
        path: 'edit/:id',
        component: new_event_dashboard_component_1.NewEventDashboardComponent,
        resolve: {
            event: event_resolver_resolver_1.EventResolverResolver
        }
    },
    {
        path: 'edit',
        component: new_event_dashboard_component_1.NewEventDashboardComponent
    },
];
var EventsDashboardRoutingModule = /** @class */ (function () {
    function EventsDashboardRoutingModule() {
    }
    EventsDashboardRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.RouterModule.forChild(routes)],
            exports: [router_1.RouterModule]
        })
    ], EventsDashboardRoutingModule);
    return EventsDashboardRoutingModule;
}());
exports.EventsDashboardRoutingModule = EventsDashboardRoutingModule;
