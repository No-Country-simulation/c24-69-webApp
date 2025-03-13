import { IsObject, IsOptional, IsString, MaxLength, MinLength, ValidateNested } from "class-validator";
import { SeccionesDto } from "./secciones.dto";
import { Type } from "class-transformer";

export class CreateFormularioDto {

    @IsString()
    @IsOptional()
    @MaxLength(500)
    observaciones: string;

    @IsString()
    @MinLength(1)
    @MaxLength(500)
    arreglo: string;

    @IsString()
    @MinLength(1)
    patente: string;


    @IsString()
    @MinLength(1)
    operario: string

    @IsObject()
    @ValidateNested()
    @Type(() => SeccionesDto)
    secciones: SeccionesDto
}
