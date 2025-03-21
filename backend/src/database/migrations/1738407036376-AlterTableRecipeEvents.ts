import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterTableRecipeEvents1738407036376 implements MigrationInterface {
  private tableName: string = "recipe_events";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE ${this.tableName}
      RENAME COLUMN parsed TO parsed_portal;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE ${this.tableName}
      RENAME COLUMN parsed_portal TO parsed;
    `);
  }
}
