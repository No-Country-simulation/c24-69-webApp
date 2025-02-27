import { BeforeInsert, BeforeUpdate, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Vehiculo {

    @PrimaryGeneratedColumn()
    id: number

    @Column({
        type: 'text',
        nullable: false,
    })
    modelo: string

    @Column({
        type: 'text',
        nullable: false,
    })
    marca: string

    @Column({
        type: 'text',
        nullable: false,
        unique: true,
    })
    patente: string


    @Column({
        type: 'boolean',
        nullable: false,
        default: true,
    })
    status: boolean

    @Column({
        type: 'date',
        nullable: false,
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

    @BeforeInsert()
    setCreatedAt(){
        this.createdAt = new Date()
    }

    @BeforeUpdate()
    setUpdatedAt(){
        this.updatedAt = new Date()
    }

}
