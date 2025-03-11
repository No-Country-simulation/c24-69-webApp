import { Vehiculo } from "src/vehiculos/entities/vehiculo.entity";
import { BeforeInsert, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { FormStatus } from "../enums";
@Entity()
export class Formulario {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        type: 'enum',
        enum: FormStatus,
        default: FormStatus.PENDIENTE
    })
    status: FormStatus;

    @Column({
        type: 'text',
        nullable: true
    })
    observaciones: string;

    @Column({
        type: 'text',
        nullable: true
    })
    arreglo: string;

    @ManyToOne(
        () => Vehiculo,
        vehiculo => vehiculo.formulario
    )
    patente: Vehiculo;

    @Column({
        type: 'date',
        nullable: false,
    })
    createdAt: Date;

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
