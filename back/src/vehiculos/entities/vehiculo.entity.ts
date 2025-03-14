import { ApiProperty } from "@nestjs/swagger";
import { Formulario } from "src/formularios/entities/formulario.entity";
import { BeforeInsert, BeforeUpdate, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Vehiculo {


    @ApiProperty({
        example: '1',
        description: 'Identificador único del vehículo',
    })
    @PrimaryGeneratedColumn()
    id: number


    @ApiProperty({
        example: 'Scania 150',
        description: 'Modelo del vehiculo',
        nullable: false,
        type: 'string',
    })
    @Column({
        type: 'text',
        nullable: false,
    })
    modelo: string


    @ApiProperty({
        example: 'Scania',
        description: 'Marca del vehiculo',
        nullable: false,
        type: 'string',
    })
    @Column({
        type: 'text',
        nullable: false,
    })
    marca: string


    @ApiProperty({
        example: 'aa-123-bb',
        description: 'Patente del vehiculo',
        nullable: false,
        type: 'string',
        uniqueItems: true
    })
    @Column({
        type: 'text',
        nullable: false,
        unique: true,
    })
    patente: string



    @ApiProperty({
        example: 'true',
        description: 'Estado del vehiculo',
        nullable: false,
        type: 'boolean',
    })
    @Column({
        type: 'boolean',
        nullable: false,
        default: true,
    })
    status: boolean


    @ApiProperty({
        example: '2021-10-10',
        description: 'Fecha de creación del vehiculo',
        nullable: false,
        type: 'string',
    })
    @Column({
        type: 'date',
        nullable: false,
    })
    createdAt: Date


    @ApiProperty({
        example: '2021-10-10',
        description: 'Fecha de actualización del vehiculo',
        nullable: true,
        type: 'string',
    })
    @Column({
        type: 'date',
        nullable: true,
    })
    updatedAt: Date


    @ApiProperty({
        example: '2021-10-10',
        description: 'Fecha de verificación del vehiculo',
        nullable: true,
        type: 'string',
    })
    @Column({
        type: 'date',
        nullable: true,
    })
    checkedAt: Date



    @ApiProperty({
        example: '2edcdfa4-4d86-4619-a9ae-bc11ed3e8bd6',
        description: 'Identificador único del formulario(foreign key)',
    })
    @OneToMany (
        () => Formulario,
        ( formulario ) => formulario.patente
    )
    formulario: Formulario

    @BeforeInsert()
    setCreatedAt(){
        this.createdAt = new Date()
    }

    @BeforeUpdate()
    setUpdatedAt(){
        this.updatedAt = new Date()
    }

}
