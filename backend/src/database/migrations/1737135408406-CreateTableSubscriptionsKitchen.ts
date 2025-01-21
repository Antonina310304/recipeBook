import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTableSubscriptionsKitchen1737135408406 implements MigrationInterface {
  private tableName: string = "subscriptions_kitchen";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE ${this.tableName}
             (
                 user_uuid uuid NOT NULL,
                 kitchen_uuid uuid NOT NULL,
                 CONSTRAINT PK_subscriptions_kitchen PRIMARY KEY (user_uuid, kitchen_uuid),
                 CONSTRAINT FK_subscriptions_kitchen_user_uuid FOREIGN KEY (user_uuid) REFERENCES users(uuid),
                 CONSTRAINT FK_subscriptions_kitchen_kitchen_uuid FOREIGN KEY (kitchen_uuid) REFERENCES kitchens(uuid)

             );`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.tableName);
  }
}
