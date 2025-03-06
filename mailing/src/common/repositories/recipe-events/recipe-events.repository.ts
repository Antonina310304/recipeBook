import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { EntityManager, Repository } from "typeorm";

import { RecipeEventsEntity } from "../../entities/recipe-events.entity";

import { CommonRecipeListForMailing, DataForMailingFoKitchens, RecipeSubscriberByEventsInterface } from "./types";

@Injectable()
export class RecipeEventsRepository extends Repository<RecipeEventsEntity> {
  @InjectRepository(RecipeEventsEntity)
  protected readonly recipeRepository: Repository<RecipeEventsEntity>;

  constructor(manager: EntityManager) {
    super(RecipeEventsEntity, manager);
  }

  async getRecipeSubscriberByEvents(): Promise<RecipeSubscriberByEventsInterface[]> {
    return await this.manager.query<RecipeSubscriberByEventsInterface[]>(`
        SELECT
            re.uuid as "eventUuid", recipe_uuid AS "recipeUuid", sk.user_uuid AS "userUuid"
        FROM recipe_events AS re
           LEFT JOIN recipes r ON r.uuid = re.recipe_uuid
           LEFT JOIN subscriptions_kitchen sk ON r.kitchen_uuid = sk.kitchen_uuid
           LEFT JOIN user_notification_setting s ON s.user_uuid = sk.user_uuid
        WHERE parsed_portal = false and portal = true
        UNION
        SELECT
            re.uuid as "eventUuid", recipe_uuid AS "recipeUuid", su.user_uuid AS "userUuid"
        FROM recipe_events AS re
           LEFT JOIN recipes r ON r.uuid = re.recipe_uuid
           LEFT JOIN subscriptions_users su ON r.user_uuid = su.subscription_user_uuid
           LEFT JOIN user_notification_setting s ON s.user_uuid = su.user_uuid
        WHERE parsed_portal = false AND portal = true
    `);
  }

  async getDataForMailingByKitchens(): Promise<DataForMailingFoKitchens[]> {
    return await this.manager.query<DataForMailingFoKitchens[]>(`
        SELECT recipe_uuid as "recipeUuid",
               re.uuid as "eventUuid",
               u.uuid as "userUuid",
               u.user_name AS "userName",
               u.user_email AS "userEmail",
               r.title as "recipeTitle",
               r.description,
               r.user_uuid as "authorUuid",
               ua.user_name as "author",
               r.kitchen_uuid AS "kitchenUuid",
               k.title as "kitchenTitle",
               r.uuid as "recipeUuid"
        FROM recipe_events AS re
                 LEFT JOIN recipes r ON r.uuid = re.recipe_uuid
                 LEFT JOIN subscriptions_kitchen sk ON r.kitchen_uuid = sk.kitchen_uuid
                 LEFT JOIN user_notification_setting s ON s.user_uuid = sk.user_uuid
                 LEFT JOIN users u on s.user_uuid = u.uuid
                 LEFT JOIN users ua on r.user_uuid = ua.uuid
                 LEFT JOIN kitchens k on r.kitchen_uuid = k.uuid
        WHERE parsed_email = false and email = true;
    `);
  }

  async getDataForMailingByAuthor(): Promise<CommonRecipeListForMailing[]> {
    return await this.manager.query<CommonRecipeListForMailing[]>(`
        WITH recipe_data(
           event_uuid,
           recipe_uuid,
           author_uuid,
           author,
           title,
           description,
           user_uuid
        ) as (SELECT 
           re.uuid,
           recipe_uuid,
           r.user_uuid AS "author_uuid",
           u.nickname  as "author",
           r.title,
           r.description,
           s.user_uuid as "user_uuid"
              FROM recipe_events AS re
                LEFT JOIN recipes r ON r.uuid = re.recipe_uuid
                LEFT JOIN subscriptions_users su ON r.user_uuid = su.subscription_user_uuid
                LEFT JOIN user_notification_setting s ON s.user_uuid = su.user_uuid
                LEFT JOIN users u on r.user_uuid = u.uuid
              WHERE parsed_email = false
                AND email = true)
        SELECT
               event_uuid as "eventUuid",
               recipe_uuid AS "recipeUuid",
               author_uuid AS "authorUuid",
               author,
               title as "recipeTitle",
               description,
               user_uuid as "userUuid",
               u.user_email AS "userEmail" ,
               u.user_name AS "userName"
        FROM recipe_data
          LEFT JOIN users u on user_uuid = u.uuid
    `);
  }
}
