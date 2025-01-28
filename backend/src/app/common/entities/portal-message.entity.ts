import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity({ name: "users" })
export class PortalMessageEntity {
  @PrimaryColumn({ name: "user_uuid", type: "uuid", nullable: false })
  readonly userUuid: string;

  @PrimaryColumn({ name: "recipe_uuid", type: "uuid", nullable: false })
  readonly recipeUuid: string;

  @Column({ name: "parsed", type: "boolean", nullable: false })
  readonly parsed: boolean;
}
