"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.NewEventDashboardComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var operators_1 = require("rxjs/operators");
var NewEventDashboardComponent = /** @class */ (function () {
    function NewEventDashboardComponent(firestoreService, fb, router, activatedRoute) {
        this.firestoreService = firestoreService;
        this.fb = fb;
        this.router = router;
        this.activatedRoute = activatedRoute;
        this.eventTypes = [];
        this.relatedEventIds = [];
        this.eventForm = this.fillForm();
    }
    NewEventDashboardComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (this.firestoreService.isEditing$.value) {
            this.activatedRoute.data.subscribe(function (data) {
                _this.event = data.event;
            });
            this.eventForm = this.fillForm();
        }
        this.eventType$ = this.firestoreService.getEventTypes().pipe(operators_1.tap(function (eventTypes) {
            var _a;
            _this.eventTypes = eventTypes;
            _this.relatedEventIds = _this.getRelatedEventIds((_a = _this.event) === null || _a === void 0 ? void 0 : _a.type);
        }));
        this.eventName$ = this.firestoreService
            .getEventNames()
            .pipe(operators_1.map(function (eventNames) {
            return (eventNames = eventNames.filter(function (x) {
                return _this.relatedEventIds.includes(x.id);
            }));
        }));
    };
    NewEventDashboardComponent.prototype.onTypeSelect = function (event) {
        var _a;
        var relatedEventIds = this.getRelatedEventIds(event);
        (_a = this.eventForm.get('relatedEvents')) === null || _a === void 0 ? void 0 : _a.reset([]);
        this.eventName$ = this.firestoreService
            .getEventNames()
            .pipe(operators_1.map(function (eventNames) {
            return (eventNames = eventNames.filter(function (x) { return relatedEventIds === null || relatedEventIds === void 0 ? void 0 : relatedEventIds.includes(x.id); }));
        }));
    };
    NewEventDashboardComponent.prototype.fillForm = function () {
        return this.fb.group({
            id: this.fb.control(this.event ? this.event.id : []),
            name: this.fb.control(this.event ? this.event.name : [], forms_1.Validators.required),
            description: this.fb.control(this.event ? this.event.description : [], forms_1.Validators.required),
            type: this.fb.control(this.event ? this.event.type : [], forms_1.Validators.required),
            priority: this.fb.control(this.event ? this.event.priority : [0], forms_1.Validators.required),
            relatedEvents: this.fb.control(this.event
                ? this.event.relatedEvents.map(function (relatedEvent) { return relatedEvent.id; })
                : [])
        });
    };
    NewEventDashboardComponent.prototype.getRelatedEventIds = function (eventId) {
        var _a;
        var foundEventNames = (_a = this.eventTypes.find(function (type) { return type.id == eventId; })) === null || _a === void 0 ? void 0 : _a.eventNameIds;
        if (foundEventNames) {
            return foundEventNames;
        }
        else {
            return [];
        }
    };
    NewEventDashboardComponent.prototype.onSubmit = function () {
        if (!this.eventForm.invalid) {
            if (this.firestoreService.isEditing$.value) {
                this.firestoreService.updateEvent(__assign({}, this.eventForm.value));
            }
            else {
                this.firestoreService.createEvent(__assign({}, this.eventForm.value));
            }
            this.router.navigate(['']);
        }
    };
    NewEventDashboardComponent = __decorate([
        core_1.Component({
            selector: 'app-new-event-dashboard',
            templateUrl: './new-event-dashboard.component.html',
            styleUrls: ['./new-event-dashboard.component.sass']
        })
    ], NewEventDashboardComponent);
    return NewEventDashboardComponent;
}());
exports.NewEventDashboardComponent = NewEventDashboardComponent;
