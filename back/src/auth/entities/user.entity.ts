import { BeforeUpdate, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import * as bcrypt from 'bcrypt'
import { UserRoles } from "../enums";
import { Formulario } from "src/formularios/entities/formulario.entity";
import { ValidRoles } from "../interfaces";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number

    @Column({
        type: 'text',
        nullable: false,
        unique: true,
    })
    nombre: string

    @Column({
        type: 'text',
        nullable: false,
        unique: true,
    })
    dni: string

    @Column({
        type: 'text',
        nullable: false,
        unique: true,
    })
    email: string


    @Column({
        type: 'text',
        nullable: false,
    })
    contraseña: string

    @Column({
        type: 'text',
        array: true,
        default: ['operario']
    })
    rol: string[]

    @Column({
        type: 'date',
        nullable: false,
        default: new Date()
    })
    createdAt: Date

    @Column({
        type: 'date',
        nullable: true,
    })
    updatedAt: Date

    @OneToMany(
        () => Formulario,
        ( formulario ) => formulario.operario
    )
    formulario: Formulario


    @BeforeUpdate()
    updateTimestamp() {
        this.updatedAt = new Date()
    }

}