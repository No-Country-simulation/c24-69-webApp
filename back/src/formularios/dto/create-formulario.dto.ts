import { IsObject, IsOptional, IsString, MaxLength, MinLength, ValidateNested } from "class-validator";
import { SeccionesDto } from "./secciones.dto";
import { Type } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";

export class CreateFormularioDto {


    @ApiProperty({
        example: 'Rayadura en la puerta derecha',
        description: 'Observaciones del vehiculo',
        required: false,
        type: 'string',
    })
    @IsString()
    @IsOptional()
    @MaxLength(500)
    observaciones: string;


    @ApiProperty({
        example: 'Rectificacion del motor',
        description: 'Arreglo del vehiculo',
        required: false,
        type: 'string',
    })
    @IsString()
    @MinLength(1)
    @MaxLength(500)
    arreglo: string;


    @ApiProperty({
        example: 'aa-123-bb',
        description: 'Patente del vehiculo a testear(foreing key)',
        required: true,
        type: 'string',
    })
    @IsString()
    @MinLength(1)
    patente: string;



    @ApiProperty({
        example: 'Juan Perez',
        description: 'Operario que realizo el formulario(foreing key)',
        required: true,
        type: 'string',
    })
    @IsString()
    @MinLength(1)
    operario: string


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
    @IsObject()
    @ValidateNested()
    @Type(() => SeccionesDto)
    secciones: SeccionesDto
}
