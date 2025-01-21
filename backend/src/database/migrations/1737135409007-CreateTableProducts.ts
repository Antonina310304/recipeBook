import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTableProducts1737135409007 implements MigrationInterface {
  private tableName: string = "products";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE ${this.tableName}
             (
                 uuid uuid DEFAULT uuid_generate_v4() NOT NULL,
                 title varchar NOT NULL,
                 unit varchar NOT NULL,
                 CONSTRAINT PK_products PRIMARY KEY (uuid)
             );`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.tableName);
  }
}
