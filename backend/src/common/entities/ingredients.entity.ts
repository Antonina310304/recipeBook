import { BaseEntity, Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";

import { ProductsEntity } from "./products.entity";
import { RecipesEntity } from "./recipes.entity";

@Entity({ name: "ingredients" })
export class IngredientsEntity extends BaseEntity {
  @ManyToOne(() => RecipesEntity, (recipe) => recipe.uuid)
  @PrimaryColumn({ name: "recipe_uuid", type: "varchar", nullable: false })
  readonly recipeUuid: string;

  @PrimaryColumn({ name: "product_uuid", type: "varchar", nullable: false })
  @ManyToOne(() => ProductsEntity, (product) => product.uuid)
  readonly productUuid: string;

  @Column({ name: "count", type: "numeric", nullable: false })
  readonly count: number;
}
