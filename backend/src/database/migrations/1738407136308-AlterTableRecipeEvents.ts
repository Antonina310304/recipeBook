import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterTableRecipeEvents1738407136308 implements MigrationInterface {
  private tableName: string = "recipe_events";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE ${this.tableName}
      ADD COLUMN parsed_email bool NOT NULL default false;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE ${this.tableName}
      DROP COLUMN parsed_email;
    `);
  }
}
