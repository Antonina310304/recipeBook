import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity({ name: "users" })
export class UsersEntity {
  @PrimaryColumn({ name: "uuid", type: "uuid", nullable: false })
  readonly uuid: string;

  @Column({ name: "nickname", type: "varchar", nullable: false })
  readonly nickname: string;

  @Column({ name: "user_email", type: "varchar", nullable: false })
  readonly userEmail: string;

  @PrimaryColumn({ name: "user_name", type: "varchar", nullable: false })
  readonly userName: string;

  @Column({ name: "date_registration", type: "timestamp", nullable: false })
  readonly dateRegistration: string;
}
