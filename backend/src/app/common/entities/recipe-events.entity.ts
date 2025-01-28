import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity({ name: "recipe_events" })
export class RecipeEventsEntity {
  @PrimaryColumn({ name: "uuid", type: "uuid", nullable: false })
  readonly uuid: string;

  @Column({ name: "recipe_uuid", type: "uuid", nullable: false })
  readonly recipeUuid: string;

  @Column({ name: "parsed", type: "boolean", nullable: false })
  readonly parsed: string;
}
