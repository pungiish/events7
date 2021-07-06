import { mapEventsHelper } from "../helpers/eventMapping.helper";

export interface IEvent {
  name: string;
  description: string;
  type: string;
  priority: number;
  relatedEvents: IEventName[] | string[];
  id?: string | null;
}

export interface IEventName {
    id: string;
    name: string;
}

export interface IEventType {
    id?: string;
    name: string;
    eventNameIds: string[];
}

export class Event implements IEvent {
  name: string;
  description: string;
  type: string;
  priority: number;
  relatedEvents: IEventName[] | string[];
  id?: string | null;

  constructor(
    id: string | null = null,
    data: any
  ) {
    this.name = data.name;
    this.description = data.description;
    this.type = data.type.id;
    this.priority = data.priority;
    this.relatedEvents = mapEventsHelper(data['relatedEvents']);
    console.log(data.relatedEvents)
    this.id = id;
  }
}