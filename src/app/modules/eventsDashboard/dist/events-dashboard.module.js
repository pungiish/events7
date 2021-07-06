"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.EventsDashboardModule = void 0;
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var firestore_data_service_1 = require("src/app/core/services/firestore-data.service");
var table_1 = require("@angular/material/table");
var events_table_component_1 = require("./view/events-table/events-table.component");
var button_1 = require("@angular/material/button");
var icon_1 = require("@angular/material/icon");
var EventsDashboardModule = /** @class */ (function () {
    function EventsDashboardModule() {
    }
    EventsDashboardModule = __decorate([
        core_1.NgModule({
            declarations: [events_table_component_1.EventsTableComponent],
            imports: [common_1.CommonModule, table_1.MatTableModule, button_1.MatButtonModule, icon_1.MatIconModule],
            providers: [firestore_data_service_1.FirestoreDataService],
            exports: [events_table_component_1.EventsTableComponent]
        })
    ], EventsDashboardModule);
    return EventsDashboardModule;
}());
exports.EventsDashboardModule = EventsDashboardModule;
