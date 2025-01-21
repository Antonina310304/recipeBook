import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity({ name: "recipes" })
export class RecipesEntity {
  @PrimaryColumn({ name: "uuid", type: "uuid", nullable: false })
  readonly uuid: string;

  @Column({ name: "user_uuid", type: "uuid", nullable: false })
  readonly userUuid: string;

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
}
