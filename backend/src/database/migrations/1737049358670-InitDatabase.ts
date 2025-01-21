import { MigrationInterface, QueryRunner } from "typeorm";

export class InitDatabase1737049358670 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);
  }

  public async down(_: QueryRunner): Promise<void> {
    return Promise.resolve();
  }
}
