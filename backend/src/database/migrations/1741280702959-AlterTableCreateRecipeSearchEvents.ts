import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterTableCreateRecipeSearchEvents1741280702959 implements MigrationInterface {
  private tableName: string = "recipe_search_events";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE ${this.tableName}
         (
             uuid uuid DEFAULT uuid_generate_v4() NOT NULL,
             recipe_uuid uuid NOT NULL,
             parsed bool NOT NULL DEFAULT false,
             event_type varchar NOT NULL
         );`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.tableName);
  }
}
