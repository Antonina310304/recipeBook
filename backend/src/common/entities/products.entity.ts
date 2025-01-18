import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity({ name: "products" })
export class ProductsEntity {
    @PrimaryColumn({ name: "uuid", type: "uuid", nullable: false })
    readonly uuid: string;

    @PrimaryColumn({ name: "title", type: "varchar", nullable: false })
    readonly title: string;

    @Column({ name: "unit", type: "varchar", nullable: false })
    readonly unit: boolean;
}
