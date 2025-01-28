import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTableUsers1737051191175 implements MigrationInterface {
  private tableName: string = "users";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE ${this.tableName}
             (
                 uuid uuid DEFAULT uuid_generate_v4(),
                 nickname varchar NOT NULL,
                 user_email varchar NOT NULL,
                 user_name varchar NOT NULL,
                 date_registration  TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
                 CONSTRAINT PK_users PRIMARY KEY (uuid),
                 UNIQUE (user_email)
             );`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.tableName);
  }
}
