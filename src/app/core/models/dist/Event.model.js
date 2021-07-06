"use strict";
exports.__esModule = true;
exports.Event = void 0;
var eventMapping_helper_1 = require("../helpers/eventMapping.helper");
var Event = /** @class */ (function () {
    function Event(id, data) {
        if (id === void 0) { id = null; }
        this.name = data.name;
        this.description = data.description;
        this.type = data.type.id;
        this.priority = data.priority;
        this.relatedEvents = eventMapping_helper_1.mapEventsHelper(data['relatedEvents']);
        console.log(data.relatedEvents);
        this.id = id;
    }
    return Event;
}());
exports.Event = Event;
