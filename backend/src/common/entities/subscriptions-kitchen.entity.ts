import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity({ name: "subscriptions_kitchen" })
export class SubscriptionsKitchenEntity {
    @PrimaryColumn({ name: "user_uuid", type: "uuid", nullable: false })
    readonly userUuid: string;

    @Column({ name: "kitchen_uuid", type: "uuid", nullable: false })
    readonly kitchenUuid: string;
}
