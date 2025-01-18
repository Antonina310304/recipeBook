import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTableUserNotificationSetting1737051557848 implements MigrationInterface {
    private tableName: string = "user_notification_setting";

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE ${this.tableName}
             (
                 user_uuid uuid NOT NULL,
                 email bool NOT NULL default false,
                 portal bool NOT NULL default false,
                 CONSTRAINT PK_notification_setting_uuid PRIMARY KEY (user_uuid)
             );`
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable(this.tableName);
    }
}
