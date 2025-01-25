import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity({ name: "ingredients" })
export class IngredientsEntity {
  @PrimaryColumn({ name: "recipe_uuid", type: "varchar", nullable: false })
  readonly recipeUuid: string;

  @PrimaryColumn({ name: "product_uuid", type: "varchar", nullable: false })
  readonly productUuid: string;

  @Column({ name: "count", type: "numeric", nullable: false })
  readonly count: number;
}
