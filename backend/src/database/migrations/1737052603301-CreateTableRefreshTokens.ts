import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTableRefreshTokens1737052603301 implements MigrationInterface {
  private tableName: string = "refresh_tokens";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE ${this.tableName}
             (
                 user_uuid uuid NOT NULL,
                 token varchar NOT NULL,
                 CONSTRAINT PK_refresh_tokens PRIMARY KEY (user_uuid)
             )`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.tableName);
  }
}
