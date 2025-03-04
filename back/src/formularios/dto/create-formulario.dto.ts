import { IsObject, IsOptional, IsString, Max, MaxLength, Min, MinLength, ValidateNested } from "class-validator";
import { CargaDto } from "./secciones/seccion-carga.dto";
import { DocumentacionDto } from "./secciones/seccion-documentacion.dto";
import { ElementosDto } from "./secciones/seccion-elementos.dto";
import { ExteriorDto } from "./secciones/seccion-exterior.dto";
import { InteriorDto } from "./secciones/seccion-interior.dto";
import { IzajeDto } from "./secciones/seccion-izaje.dto";
import { MecanicaDto } from "./secciones/seccion-mecanica.dto";
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

    @IsObject()
    @ValidateNested()
    @Type(() => SeccionesDto)
    secciones: SeccionesDto
}
