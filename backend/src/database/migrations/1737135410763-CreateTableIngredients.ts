import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTableIngredients1737135410763 implements MigrationInterface {
    private tableName: string = "ingredients";

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE ${this.tableName}
             (
                 recipe_uuid uuid NOT NULL,
                 product_uuid uuid NOT NULL,
                 count numeric NOT NULL,
                 CONSTRAINT PK_ingredients PRIMARY KEY (recipe_uuid, product_uuid),
                 CONSTRAINT FK_ingredients_recipe_uuid FOREIGN KEY (recipe_uuid) REFERENCES recipes(uuid),
                 CONSTRAINT FK_ingredients_product_uuid FOREIGN KEY (product_uuid) REFERENCES products(uuid)
             );`
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable(this.tableName);
    }
}
