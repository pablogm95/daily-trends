import { Uuid } from './value-object/Uuid'

export abstract class DomainEvent {
  static EVENT_NAME: string
  readonly eventId: string

  constructor(eventId?: string) {
    this.eventId = eventId ?? Uuid.random().value
  }

  abstract eventName(): string

  static fromPrimitives: (params: {
    eventId: string;
    attributes: DomainEventAttributes;
  }) => DomainEvent

  abstract toPrimitives(): DomainEventAttributes;
}

export type DomainEventClass = {
  EVENT_NAME: string;
  fromPrimitives(params: {
    eventId: string;
    attributes: DomainEventAttributes;
  }): DomainEvent;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type DomainEventAttributes = any;
