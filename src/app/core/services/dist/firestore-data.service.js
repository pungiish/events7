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
exports.FirestoreDataService = void 0;
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var firebase = require("firebase/app");
var Event_model_1 = require("../models/Event.model");
var eventMapping_helper_1 = require("../helpers/eventMapping.helper");
var FirestoreDataService = /** @class */ (function () {
    function FirestoreDataService(afs) {
        this.afs = afs;
        this.selectedEvent$ = new rxjs_1.BehaviorSubject(null);
        this.eventName$ = new rxjs_1.BehaviorSubject(null);
        this.eventType$ = new rxjs_1.BehaviorSubject(null);
        this.isEditing$ = new rxjs_1.BehaviorSubject(false);
    }
    FirestoreDataService.prototype.getEvents = function () {
        var _this = this;
        var events = this.afs
            .collection('events')
            .snapshotChanges()
            .pipe(operators_1.map(function (collection) {
            return collection.map(function (doc) {
                var document = doc.payload.doc;
                console.log(document.data());
                return __assign({}, new Event_model_1.Event(document.id, document.data()));
            });
        }), operators_1.catchError(function (err) {
            console.log(err);
            return rxjs_1.of(err);
        }));
        var eventNames = this.afs
            .collection('eventNames')
            .snapshotChanges()
            .pipe(operators_1.map(function (collection) {
            return collection.map(function (doc) {
                return {
                    id: doc.payload.doc.id,
                    name: doc.payload.doc.data().name
                };
            });
        }), operators_1.shareReplay(2), operators_1.catchError(function (err) {
            console.log(err);
            return rxjs_1.of(err);
        }));
        var eventTypes = this.afs
            .collection('eventTypes', function (ref) { return ref.orderBy('name'); })
            .snapshotChanges()
            .pipe(operators_1.map(function (collection) {
            return collection.map(function (doc) {
                return {
                    id: doc.payload.doc.id,
                    name: doc.payload.doc.data().name,
                    eventNameIds: doc.payload.doc
                        .data()['related-events'].map(function (relatedRef) {
                        return relatedRef.id;
                    })
                };
            });
        }), operators_1.shareReplay(2), operators_1.catchError(function (err) {
            console.log(err);
            return rxjs_1.of(err);
        }));
        return rxjs_1.combineLatest([events, eventNames, eventTypes]).pipe(operators_1.map(function (_a) {
            var events = _a[0], eventNames = _a[1], eventTypes = _a[2];
            _this.eventName$.next(eventNames);
            _this.eventType$.next(eventTypes);
            events = eventMapping_helper_1.filterEvents(events, eventTypes, eventNames);
            return { events: events, eventNames: eventNames, eventTypes: eventTypes };
        }));
    };
    FirestoreDataService.prototype.getEventNames = function () {
        return this.afs
            .collection('eventNames')
            .snapshotChanges()
            .pipe(operators_1.map(function (collection) {
            return collection.map(function (doc) {
                return {
                    id: doc.payload.doc.id,
                    name: doc.payload.doc.data().name
                };
            });
        }));
    };
    FirestoreDataService.prototype.getEventTypes = function () {
        return this.afs
            .collection('eventTypes', function (ref) { return ref.orderBy('name'); })
            .snapshotChanges()
            .pipe(operators_1.map(function (collection) {
            return collection.map(function (doc) {
                return {
                    id: doc.payload.doc.id,
                    name: doc.payload.doc.data().name,
                    eventNameIds: doc.payload.doc
                        .data()['related-events'].map(function (relatedRef) {
                        return relatedRef.id;
                    })
                };
            });
        }));
    };
    FirestoreDataService.prototype.getEventNamesById = function (id) {
        var a = this.afs.collection('eventNames', function (ref) {
            return ref.where(firebase["default"].firestore.FieldPath.documentId(), '==', id);
        });
        return a.snapshotChanges().pipe(operators_1.map(function (collection) {
            return collection.map(function (doc) {
                return doc.payload.doc.data();
            });
        }));
    };
    FirestoreDataService.prototype.createEvent = function (event) {
        var _this = this;
        event.relatedEvents = event.relatedEvents.map(function (relatedEventId) {
            return _this.afs.firestore.doc('eventNames/' + relatedEventId);
        });
        event.type = this.afs.firestore.doc('eventTypes/' + event.type);
        this.afs
            .collection('events')
            .add(__assign({}, event))["catch"](function (err) {
            console.error(err);
        });
    };
    FirestoreDataService.prototype.updateEvent = function (event) {
        var _this = this;
        event.relatedEvents = event.relatedEvents.map(function (relatedEventId) {
            return _this.afs.firestore.doc('eventNames/' + relatedEventId);
        });
        event.type = this.afs.firestore.doc('eventTypes/' + event.type);
        this.afs
            .collection('events')
            .doc(event.id)
            .update(__assign({}, event))["catch"](function (err) {
            console.error(err);
        });
    };
    FirestoreDataService.prototype.deleteEvent = function (eventId) {
        this.afs.firestore
            .doc("events/" + eventId)["delete"]()["catch"](function (err) { return console.log(err); });
    };
    FirestoreDataService.prototype.getEvent = function (eventId) {
        return this.afs
            .collection('events')
            .doc(eventId)
            .get()
            .pipe(operators_1.map(function (event) {
            console.log(event.data());
            return __assign({}, new Event_model_1.Event(event.id, event.data()));
        }), operators_1.take(1));
    };
    FirestoreDataService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], FirestoreDataService);
    return FirestoreDataService;
}());
exports.FirestoreDataService = FirestoreDataService;
