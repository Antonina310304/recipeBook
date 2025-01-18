import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity({ name: "user_notification_setting" })
export class UserNotificationSettingEntity {
    @PrimaryColumn({ name: "user_uuid", type: "uuid", nullable: false })
    readonly userUuid: string;

    @Column({ name: "email", type: "boolean", nullable: false })
    readonly email: string;

    @Column({ name: "portal", type: "boolean", nullable: false })
    readonly portal: string;
}
