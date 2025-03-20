import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn } from "typeorm";

import { UsersEntity } from "./users.entity";
import { IngredientsEntity } from "./ingredients.entity";

@Entity({ name: "recipes" })
export class RecipesEntity extends BaseEntity {
  @PrimaryColumn({ name: "uuid", type: "uuid", nullable: false })
  readonly uuid: string;

  @Column({ name: "user_uuid", type: "uuid", nullable: false })
  @ManyToOne(() => UsersEntity, (user) => user.uuid)
  @JoinColumn()
  readonly userUuid: UsersEntity;

  @Column({ name: "kitchen_uuid", type: "uuid", nullable: false })
  readonly kitchenUuid: string;

  @PrimaryColumn({ name: "date_create", type: "timestamp", nullable: false })
  readonly dateCreate: string;

  @Column({ name: "title", type: "varchar", nullable: false })
  readonly title: string;

  @Column({ name: "description", type: "varchar", nullable: false })
  readonly description: string;

  @Column({ name: "manual", type: "varchar", nullable: true })
  readonly manual: string;

  @OneToMany((type) => IngredientsEntity, (ingredients) => ingredients.recipeUuid)
  ingredients: IngredientsEntity[];
}
