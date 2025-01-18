import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTableAuthCode1737052061913 implements MigrationInterface {
    private tableName: string = "auth_code"

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE ${this.tableName}
             (
                 user_email varchar NOT NULL,
                 code varchar NOT NULL,
                 date_create  TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
                 CONSTRAINT PK_auth_code PRIMARY KEY (user_email),
                 CONSTRAINT FK_auth_code_user_email FOREIGN KEY (user_email) REFERENCES users(user_email)
             )`
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable(this.tableName);
    }
}
