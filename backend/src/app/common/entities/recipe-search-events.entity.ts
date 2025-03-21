import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity({ name: "recipe_search_events" })
export class RecipeSearchEventsEntity {
  @PrimaryColumn({ name: "uuid", type: "uuid", nullable: false })
  readonly uuid: string;

  @Column({ name: "recipe_uuid", type: "uuid", nullable: false })
  readonly recipeUuid: string;

  @Column({ name: "parsed", type: "boolean", nullable: false })
  readonly parsed: boolean;

  @Column({ name: "event_type", type: "varchar", nullable: false })
  readonly eventType: string;
}
