import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTablePortalMessage1737135411345 implements MigrationInterface {
  private tableName: string = "portal_message";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE ${this.tableName}
             (
                 user_uuid uuid NOT NULL,
                 recipe_uuid uuid NOT NULL,
                 parsed boolean NOT NULL,
                 CONSTRAINT PK_portal_message PRIMARY KEY (user_uuid, recipe_uuid),
                 CONSTRAINT FK_ingredients_recipe_uuid FOREIGN KEY (recipe_uuid) REFERENCES recipes(uuid)
             );`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.tableName);
  }
}
