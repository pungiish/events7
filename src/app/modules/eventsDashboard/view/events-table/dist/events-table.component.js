"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.EventsTableComponent = void 0;
var core_1 = require("@angular/core");
var EventsTableComponent = /** @class */ (function () {
    function EventsTableComponent(firestoreService, router) {
        this.firestoreService = firestoreService;
        this.router = router;
        this.displayedColumns = [
            'name',
            'description',
            'type',
            'priority',
            'relatedEvents',
            'actions',
        ];
        this.clickedRows = new Set();
    }
    EventsTableComponent.prototype.ngOnInit = function () {
        this.firestoreService.isEditing$.next(false);
        this.eventsData$ = this.firestoreService.getEvents();
    };
    EventsTableComponent.prototype.onEditClick = function (event) {
        this.firestoreService.selectedEvent$.next(event);
        this.router.navigate(['edit', event.id]);
    };
    EventsTableComponent.prototype.onDeleteClick = function (eventId) {
        this.firestoreService.deleteEvent(eventId);
    };
    EventsTableComponent = __decorate([
        core_1.Component({
            selector: 'app-events-table',
            templateUrl: './events-table.component.html',
            styleUrls: ['./events-table.component.sass']
        })
    ], EventsTableComponent);
    return EventsTableComponent;
}());
exports.EventsTableComponent = EventsTableComponent;
