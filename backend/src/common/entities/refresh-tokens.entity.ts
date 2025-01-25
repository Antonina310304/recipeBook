import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity({ name: "refresh_tokens" })
export class RefreshTokensEntity {
  @PrimaryColumn({ name: "user_uuid", type: "uuid", nullable: false })
  readonly userUuid: string;

  @Column({ name: "token", type: "varchar", nullable: false })
  readonly token: string;
}
