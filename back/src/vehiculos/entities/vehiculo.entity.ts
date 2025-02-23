import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Vehiculo {

    @PrimaryGeneratedColumn('increment')
    id: number

    @Column({
        type: 'text',
        nullable: false,
    })
    modelo: string

    @Column({
        type: 'text',
        nullable: false,
        unique: true,
    })
    marca: string

    @Column({
        type: 'text',
        nullable: false,
        unique: true,
    })
    patente: string

    @Column({
        type: 'date',
        nullable: false,
        default: new Date(),
    })
    createdAt: Date

    @Column({
        type: 'date',
        nullable: true,
    })
    updatedAt: Date

    @Column({
        type: 'date',
        nullable: true,
    })
    checkedAt: Date
}
