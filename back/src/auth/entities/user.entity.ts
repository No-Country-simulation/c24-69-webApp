import { BeforeUpdate, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import * as bcrypt from 'bcrypt'
import { UserRoles } from "../enums";
import { Formulario } from "src/formularios/entities/formulario.entity";
import { ValidRoles } from "../interfaces";
import { ApiProperty } from "@nestjs/swagger";

@Entity()
export class User {

    @ApiProperty({
        example: 1,
        description: 'Identificador único del usuario',
        uniqueItems: true
    })
    @PrimaryGeneratedColumn()
    id: number


    @ApiProperty({
        example: 'Juan Perez',
        description: 'Nombre del usuario',
        type: 'string',
        uniqueItems: true,
        nullable: false
    })
    @Column({
        type: 'text',
        nullable: false,
        unique: true,
    })
    nombre: string


    @ApiProperty({
        example: '24851090',
        description: 'DNI del usuario',
        type: 'string',
        uniqueItems: true,
        nullable: false
    })
    @Column({
        type: 'text',
        nullable: false,
        unique: true,
    })
    dni: string


    @ApiProperty({
        example: 'alguien@gmail.com',
        description: 'Correo del usuario',
        type: 'string',
        nullable: false,
        uniqueItems: true
    })
    @Column({
        type: 'text',
        nullable: false,
        unique: true,
    })
    email: string



    @ApiProperty({
        example: 'Abc123',
        description: 'Contraseña del usuario',
        type: 'string',
        nullable: false,
    })
    @Column({
        type: 'text',
        nullable: false,
    })
    contraseña: string

    @Column({
        type: 'text',
        array: true,
        nullable: false,
        default: ['operario'],
    })
    rol: string[];


    @ApiProperty({
        example: '2021-01-01',
        description: 'Fecha de creación del usuario',
        type: 'string',
        nullable: false,
    })
    @Column({
        type: 'date',
        nullable: false,
        default: new Date()
    })
    createdAt: Date


    @ApiProperty({
        example: '2021-01-01',
        description: 'Fecha de actualización del usuario',
        type: 'string',
        nullable: true,
    })
    @Column({
        type: 'date',
        nullable: true,
    })
    updatedAt: Date



    @ApiProperty({
        example: '2edcdfa4-4d86-4619-a9ae-bc11ed3e8bd6',
        description: 'Identificador único del formulario',
        type: 'string',
    })
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