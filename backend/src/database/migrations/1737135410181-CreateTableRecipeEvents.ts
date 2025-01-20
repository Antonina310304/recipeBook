import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTableRecipeEvents1737135410181 implements MigrationInterface {
  private tableName: string = "recipe_events";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE ${this.tableName}
             (
                 uuid uuid DEFAULT uuid_generate_v4() NOT NULL,
                 recipe_uuid uuid NOT NULL,
                 parsed bool NOT NULL DEFAULT false,
                 CONSTRAINT PK_recipe_events PRIMARY KEY (uuid),
                 CONSTRAINT recipe_events_recipe_uuid FOREIGN KEY (recipe_uuid) REFERENCES recipes(uuid)
             );`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.tableName);
  }
}
