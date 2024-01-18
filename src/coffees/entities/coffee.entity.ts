import { Column, Entity, Index, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Flavor } from "./flavor.entity";

@Entity()
export class Coffee {

    @PrimaryGeneratedColumn()
    id: number;

    @Index()
    @Column()
    name: string;

    @Column()
    brand: string;

    @Column({ default: 0 })
    recomendations: number;

    @JoinTable()
    @ManyToMany(
        type => Flavor,
        flavor => flavor.coffess,
        {
            cascade: true // [insert]
        }
    )
    flavors: Flavor[];
}