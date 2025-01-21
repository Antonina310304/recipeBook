import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTableKitchens1737135407783 implements MigrationInterface {
  private tableName: string = "kitchens";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE ${this.tableName}
             (
                 uuid uuid DEFAULT uuid_generate_v4() NOT NULL,
                 title varchar NOT NULL,
                 description varchar,
                 CONSTRAINT PK_kitchen PRIMARY KEY (uuid)
             );`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.tableName);
  }
}
