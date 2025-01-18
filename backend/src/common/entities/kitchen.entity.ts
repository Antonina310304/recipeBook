import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity({ name: "kitchens" })
export class KitchensEntity {
    @PrimaryColumn({ name: "uuid", type: "uuid", nullable: false })
    readonly uuid: string;

    @Column({ name: "title", type: "varchar", nullable: false })
    readonly title: string;

    @Column({ name: "description", type: "varchar", nullable: false })
    readonly description: string;
}
