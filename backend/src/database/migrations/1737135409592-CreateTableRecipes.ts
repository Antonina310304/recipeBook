import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTableRecipes1737135409592 implements MigrationInterface {
  private tableName: string = "recipes";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE ${this.tableName}
             (
                 uuid uuid DEFAULT uuid_generate_v4() NOT NULL,
                 user_uuid uuid NOT NULL,
                 kitchen_uuid uuid NOT NULL,
                 date_create  TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
                 title VARCHAR NOT NULL,
                 description VARCHAR NOT NULL,
                 manual VARCHAR NOT NULL,
                 CONSTRAINT PK_recipes PRIMARY KEY (uuid),
                 CONSTRAINT FK_recipes_user_uuid FOREIGN KEY (user_uuid) REFERENCES users(uuid),
                 CONSTRAINT FK_recipes_kitchen_uuid FOREIGN KEY (kitchen_uuid) REFERENCES kitchens(uuid)
             )`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.tableName);
  }
}
