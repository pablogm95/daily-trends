import { DomainEvent, DomainEventClass } from '@/Contexts/Shared/domain/DomainEvent'
import { DomainEventSubscriber } from '@/Contexts/Shared/domain/DomainEventSubscriber'
import { EventBus } from '@/Contexts/Shared/domain/EventBus'
import { PubSub } from '@google-cloud/pubsub'

export class PubSubEventBus implements EventBus {
  private client: PubSub = new PubSub()

  async publish(events: DomainEvent[]): Promise<void> {
    events.forEach((event) =>
      this.client.topic(event.eventName()).publishMessage({
        data: Buffer.from(JSON.stringify(event.toPrimitives())),
        messageId: event.eventId,
      })
    )
  }

  public async addSubscribers(
    subscribers: Set<DomainEventSubscriber<DomainEvent>>
  ): Promise<void> {
    // TODO: Refactor
    for (const subscriber of subscribers) {
      for (const subscribedTo of subscriber.subscribedTo()) {
        await this.createTopicIfNotExists(subscribedTo.EVENT_NAME)
        await this.createSubscriptionIfNotExists(subscribedTo.EVENT_NAME)
      }
    }

    subscribers.forEach(async (subscriber) => {
      this.attachSubscriberToEvent(subscriber.subscribedTo(), subscriber)
    })
  }

  private attachSubscriberToEvent(
    subscribedTo: Set<DomainEventClass>,
    subscriber: DomainEventSubscriber<DomainEvent>
  ): void {
    subscribedTo.forEach((domainEvent) => {
      this.client
        .subscription(this.subscriptionName(domainEvent.EVENT_NAME))
        .on('message', async (message) => {
          await subscriber.on(
            domainEvent.fromPrimitives({
              eventId: message.id,
              attributes: JSON.parse(message.data.toString()),
            })
          )
          message.ack()
        })
    })
  }

  private async createTopicIfNotExists(topicName: string): Promise<void> {
    const [exists] = await this.client.topic(topicName).exists()

    if (!exists) {
      await this.client.createTopic(topicName)
    }
  }

  private async createSubscriptionIfNotExists(
    topicName: string
  ): Promise<void> {
    const [exists] = await this.client
      .subscription(this.subscriptionName(topicName))
      .exists()

    if (!exists) {
      await this.client.createSubscription(
        topicName,
        this.subscriptionName(topicName)
      )
    }
  }

  private subscriptionName(topic: string): string {
    return `${topic}-sub`
  }
}
