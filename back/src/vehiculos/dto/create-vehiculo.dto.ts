import { IsString, MaxLength, Min, MinLength } from "class-validator"

export class CreateVehiculoDto {

    @IsString()
    @MinLength(1)
    @MaxLength(50)
    modelo: string

    @IsString()
    @MinLength(1)
    @MaxLength(25)
    marca: string

    @IsString()
    @MinLength(1)
    @MaxLength(10)
    patente: string

}
