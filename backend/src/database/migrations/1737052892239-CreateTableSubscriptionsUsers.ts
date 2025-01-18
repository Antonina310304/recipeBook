import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTableSubscriptionsUsers1737052892239 implements MigrationInterface {
    private tableName: string = "subscriptions_users"

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE ${this.tableName}
             (
                 user_uuid uuid NOT NULL,
                 subscription_user_uuid uuid NOT NULL,
                 CONSTRAINT PK_subscriptions_users PRIMARY KEY (user_uuid, subscription_user_uuid),
                 CONSTRAINT FK_subscriptions_users_user_email FOREIGN KEY (user_uuid) REFERENCES users(uuid),
                 CONSTRAINT FK_subscriptions_users_user_uuid FOREIGN KEY (subscription_user_uuid) REFERENCES users(uuid)
             )`
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable(this.tableName);
    }
}
