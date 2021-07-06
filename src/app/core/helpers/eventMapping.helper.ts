import { IEvent, IEventName, IEventType } from '../models/Event.model';

export const mapEventsHelper = (relatedEvents: any[]): any => {
  relatedEvents = relatedEvents.map(
    (eventDoc) =>
      (eventDoc = {
        id: eventDoc.id,
      })
  );
  return relatedEvents;
};

export const filterEvents = (
  events: IEvent[],
  eventTypes: IEventType[],
  relatedEvents: IEventName[]
): IEvent[] => {
  events = filterEventTypes(events, eventTypes);
  events = filterRelatedEvents(events, relatedEvents);
  return events;
};

export const filterEventTypes = (
  events: IEvent[],
  eventTypes: IEventType[]
) => {
  return (events = events.map((event) => {
    event.type = eventTypes.find((eventType) => {
      console.log(eventType);
      return eventType.id === event.type;
    })?.name as string;
    return event;
  }));
};

export const filterRelatedEvents = (
  events: IEvent[],
  relatedEvents: IEventName[]
) => {
  return (events = events.map((event) => {
    event.relatedEvents = event.relatedEvents.map((relatedEventId) => {
      return (
        (relatedEvents.find((eventName) => {
            console.log(eventName)
          return eventName.id == (relatedEventId as IEventName).id;
        }) as IEventName).name
      );
    });
    return event;
  }));
};
