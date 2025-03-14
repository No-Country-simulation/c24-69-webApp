import { BeforeInsert, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

import { Vehiculo } from "src/vehiculos/entities/vehiculo.entity";
import { FormStatus } from "../enums";
import { User } from "src/auth/entities/user.entity";
import { ApiProperty } from "@nestjs/swagger";

@Entity()
export class Formulario {


    @ApiProperty({
        example: '2edcdfa4-4d86-4619-a9ae-bc11ed3e8bd6',
        description: 'Identificador del formulario',
        required: true,
        type: 'string',
    })
    @PrimaryGeneratedColumn('uuid')
    id: string;


    @ApiProperty({
        example: 'PENDIENTE',
        description: 'Estado del formulario',
        required: true,
        type: 'string',
        enum: FormStatus
    })
    @Column({
        type: 'enum',
        enum: FormStatus,
        default: FormStatus.PENDIENTE
    })
    status: FormStatus;


    @ApiProperty({
        example: 'Rayadura en la puerta derecha',
        description: 'Observaciones del vehiculo',
        required: false,
        type: 'string',
    })
    @Column({
        type: 'text',
        nullable: true
    })
    observaciones: string;


    @ApiProperty({
        example: 'Rectificacion del motor',
        description: 'Arreglo del vehiculo',
        required: false,
        type: 'string',
    })
    @Column({
        type: 'text',
        nullable: true
    })
    arreglo: string;


    @ApiProperty({
        example: 'aa-123-bb',
        description: 'Patente del vehiculo a testear(foreing key)',
        required: true,
        type: 'string',
    })
    @ManyToOne(
        () => Vehiculo,
        ( vehiculo ) => vehiculo.formulario
    )
    patente: Vehiculo;


    @ApiProperty({
        example: 'Juan Perez',
        description: 'Operario que realizo el formulario(foreing key)',
        required: true,
        type: 'string',
    })
    @ManyToOne(
        () => User,
        ( user ) => user.formulario
    )
    operario: User;


    @ApiProperty({
        example: '2021-09-01',
        description: 'Fecha de creacion del formulario',
        required: true,
        type: 'string',
    })
    @Column({
        type: 'date',
        nullable: false,
    })
    createdAt: Date;


    @ApiProperty({
        example: {
            documentacion: {
                tarjetaVerde: true,
                seguroVto: '2021-09-01',
                rto: '2021-09-01',
                tarjetaRuta: true,
                licenciaConductor: '2021-09-01',
            },
            exterior: {
                carroceria: false,
                limpieza: true,
                vidrios: false,
                luces: true,
                neumaticos: true,
                llantas: true,
            },
            interior: {
                tablero: true,
                tacografo: false,
                limpieza: true,
                asientos: true,
                aireYcalefaccion: true,
            },
            mecanica: {
                suspension: true,
                mangueras: false,
                aceite: false,
                frenos: false,
                direccion: true,
                agua: true,
                bateria: true,
            },
            elementos: {
                herramientas: true,
                repuestoNeumatico: true,
                botiquin: true,
                tacos: true,
                extintor: false,
                linterna: false,
                crique: true,
            },
            carga: {
                cadenas: false,
                correas: true,
                soportes: false,
                avisos: true,
            },
            izaje: {
                fajas: true,
                grilletes: true,
                ganchos: false,
                malacate: false,
                estabilizadores: true,
            }
        },
        description: 'Secciones del formulario',
        required: true,
    })
    @Column({
        type: 'jsonb',
        nullable: false
    })
    secciones: {
        documentacion: {
            tarjetaVerde: boolean;
            seguroVto: Date;
            rto: Date;
            tarjetaRuta: boolean;
            licenciaConductor: Date;
        };
        exterior: {
            carroceria: boolean;
            limpieza: boolean;
            vidrios: boolean;
            luces: boolean;
            neumaticos: boolean;
            llantas: boolean;
        };
        interior: {
            tablero: boolean;
            tacografo: boolean;
            limpieza: boolean;
            asientos: boolean;
            aireYcalefaccion: boolean;
        };
        mecanica: {
            suspension: boolean;
            mangueras: boolean;
            aceite: boolean;
            frenos: boolean;
            direccion: boolean;
            agua: boolean;
            bateria: boolean;
        };
        elementos: {
            herramientas: boolean;
            repuestoNeumatico: boolean;
            botiquin: boolean;
            tacos: boolean;
            extintor: boolean;
            linterna: boolean;
            crique: boolean;
        };
        carga: {
            cadenas: boolean;
            correas: boolean;
            soportes: boolean;
            avisos: boolean;
        };
        izaje: {
            fajas: boolean;
            grilletes: boolean;
            ganchos: boolean;
            malacate: boolean;
            estabilizadores: boolean;
        }
    }


    @BeforeInsert()
    setCreatedAt(){
        this.createdAt = new Date()
    }
    
}
