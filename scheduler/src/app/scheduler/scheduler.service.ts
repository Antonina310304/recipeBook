import { EntityManager } from "typeorm";
import { CronJob } from "cron";
import { SchedulerRegistry } from "@nestjs/schedule";
import { Injectable } from "@nestjs/common";

import { NotificationMessageService } from "../notification-message/notification-message.service";
import {
  CommonRecipeListForMailing,
  DataForMailingFoKitchens,
  RecipeSubscriberByEventsInterface
} from "../../common/repositories/recipe-events/types";
import { ConfigService } from "../../common/config/config.service";
import { EmailService } from "../email-message/email.service";
import { MessageFactory } from "../email-message/messageFactory/message.factory";
import { MessageMaker, MessageType } from "../email-message/messageFactory/types";
import { EmailSendInterface } from "../email-message/types";
import { NotificationMessageMapper } from "../notification-message/notification-message.mapper";
import { ConfirmRecipeEventsInterface } from "../notification-message/types";
import { PortalMessageEntity } from "../../common/entities/portal-message.entity";

@Injectable()
export class SchedulerService {
  constructor(
    private readonly schedulerRegistry: SchedulerRegistry,
    private readonly entityManager: EntityManager,
    private readonly configService: ConfigService,
    private readonly notificationMessageService: NotificationMessageService,
    private readonly emailService: EmailService
  ) {
    const pushNotificationsJob: CronJob = new CronJob(
      this.configService.cron.notificationsPortal,
      async (): Promise<void> => {
        await this.pushNotificationsPortal();
      }
    );

    this.schedulerRegistry.addCronJob("pushNotification", pushNotificationsJob);
    pushNotificationsJob.start();

    const runMailingJob: CronJob = new CronJob(this.configService.cron.notificationsEmail, async (): Promise<void> => {
      await this.runMailing();
    });

    this.schedulerRegistry.addCronJob("sendEmail", runMailingJob);
    runMailingJob.start();
  }

  async pushNotificationsPortal(): Promise<void> {
    await this.entityManager.transaction(async (entityManager) => {
      // получила список сообщений для уведомлений на портал
      const messagesForPortal: RecipeSubscriberByEventsInterface[] =
        await this.notificationMessageService.getNotificationInfoForPortal(entityManager);

      // сохранила сообщения в portal_message
      const messageForSavePortalMessage: PortalMessageEntity[] = [];
      NotificationMessageMapper.mapToRecipeEventsForPortalMessage(messagesForPortal, messageForSavePortalMessage);
      await this.notificationMessageService.savePortalMessage(messageForSavePortalMessage, entityManager);

      const eventsToSave: ConfirmRecipeEventsInterface[] = [];
      NotificationMessageMapper.mapToRecipeEventsFromPortalMessage(messagesForPortal, eventsToSave);

      // установка отметки успешной обработки сообщения
      await this.notificationMessageService.confirmRecipeEvents(eventsToSave, entityManager);
    });
  }

  async runMailing(): Promise<void> {
    const site: string = this.configService.site;
    await this.entityManager.transaction(async (entityManager) => {
      // массив данных для рассылки по кухням
      const messagesByKitchens: DataForMailingFoKitchens[] =
        await this.notificationMessageService.getRecipeListForMailingByKitchens(entityManager);
      const messagesByAuthor: CommonRecipeListForMailing[] =
        await this.notificationMessageService.getRecipeListForMailingByAuthor(entityManager);

      const messageFactory: MessageFactory = new MessageFactory();
      const kitchenMessageMaker: MessageMaker = messageFactory.getMessageMaker(MessageType.KITCHEN);
      const authorMessageMaker: MessageMaker = messageFactory.getMessageMaker(MessageType.AUTHOR);

      for (const message of messagesByKitchens) {
        const condition: EmailSendInterface = kitchenMessageMaker.makeMessage({
          [MessageType.KITCHEN]: { ...message, site }
        });
        await this.emailService.send(condition);
      }

      for (const message of messagesByAuthor) {
        const condition: EmailSendInterface = authorMessageMaker.makeMessage({
          [MessageType.AUTHOR]: { ...message, site }
        });
        await this.emailService.send(condition);
      }

      const eventsToSave: ConfirmRecipeEventsInterface[] = [];
      NotificationMessageMapper.mapToRecipeEventsFromEmailMessage(
        [...messagesByKitchens, ...messagesByAuthor],
        eventsToSave
      );

      // установка отметки успешной обработки сообщения
      await this.notificationMessageService.confirmRecipeEvents(eventsToSave, entityManager);
    });
  }
}
