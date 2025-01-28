import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity({ name: "subscriptions_users" })
export class SubscriptionsUsersEntity {
  @PrimaryColumn({ name: "user_uuid", type: "uuid", nullable: false })
  readonly userUuid: string;

  @Column({ name: "subscription_user_uuid", type: "uuid", nullable: false })
  readonly subscriptionUserUuid: string;
}
