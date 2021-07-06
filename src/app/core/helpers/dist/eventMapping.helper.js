"use strict";
exports.__esModule = true;
exports.filterRelatedEvents = exports.filterEventTypes = exports.filterEvents = exports.mapEventsHelper = void 0;
exports.mapEventsHelper = function (relatedEvents) {
    relatedEvents = relatedEvents.map(function (eventDoc) {
        return (eventDoc = {
            id: eventDoc.id
        });
    });
    return relatedEvents;
};
exports.filterEvents = function (events, eventTypes, relatedEvents) {
    events = exports.filterEventTypes(events, eventTypes);
    events = exports.filterRelatedEvents(events, relatedEvents);
    return events;
};
exports.filterEventTypes = function (events, eventTypes) {
    return (events = events.map(function (event) {
        var _a;
        event.type = (_a = eventTypes.find(function (eventType) {
            return eventType.id === event.type;
        })) === null || _a === void 0 ? void 0 : _a.name;
        return event;
    }));
};
exports.filterRelatedEvents = function (events, relatedEvents) {
    return (events = events.map(function (event) {
        var filteredRelatedEvents = event.relatedEvents.map(function (relatedEventId) {
            var _a;
            return (_a = relatedEvents.find(function (eventName) {
                var _a;
                return eventName.id == ((_a = relatedEventId) === null || _a === void 0 ? void 0 : _a.id);
            })) === null || _a === void 0 ? void 0 : _a.name;
        });
        event.relatedEvents = filteredRelatedEvents;
        return event;
    }));
};
