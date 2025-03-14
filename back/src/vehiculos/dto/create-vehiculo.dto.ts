import { ApiProperty } from "@nestjs/swagger"
import { IsString, MaxLength, Min, MinLength } from "class-validator"

export class CreateVehiculoDto {


    @ApiProperty({
        example: 'Scania 150',
        description: 'Modelo del vehiculo',
        nullable: false,
        type: 'string',
    })
    @IsString()
    @MinLength(1)
    @MaxLength(50)
    modelo: string


    @ApiProperty({
        example: 'Scania',
        description: 'Marca del vehiculo',
        nullable: false,
        type: 'string',
    })
    @IsString()
    @MinLength(1)
    @MaxLength(25)
    marca: string


    @ApiProperty({
        example: 'aa-123-bb',
        description: 'Patente del vehiculo',
        nullable: false,
        type: 'string',
        uniqueItems: true
    })
    @IsString()
    @MinLength(1)
    @MaxLength(10)
    patente: string

}
