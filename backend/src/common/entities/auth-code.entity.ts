import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity({ name: "auth_code" })
export class AuthCodeEntity {
  @PrimaryColumn({ name: "user_email", type: "varchar", nullable: false })
  readonly userEmail: string;

  @Column({ name: "code", type: "varchar", nullable: false })
  readonly code: string;

  @Column({ name: "date_create", type: "timestamp", nullable: false })
  readonly dateCreate: string;
}
