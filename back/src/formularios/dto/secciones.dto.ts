import { ValidateNested } from "class-validator";
import { Type } from "class-transformer";

import { CargaDto } from "./secciones/seccion-carga.dto";
import { DocumentacionDto } from "./secciones/seccion-documentacion.dto";
import { ElementosDto } from "./secciones/seccion-elementos.dto";
import { ExteriorDto } from "./secciones/seccion-exterior.dto";
import { InteriorDto } from "./secciones/seccion-interior.dto";
import { IzajeDto } from "./secciones/seccion-izaje.dto";
import { MecanicaDto } from "./secciones/seccion-mecanica.dto";

export class SeccionesDto {

    @ValidateNested()
    @Type(() => DocumentacionDto)
    documentacion: DocumentacionDto;

    @ValidateNested()
    @Type(() => ExteriorDto)
    exterior: ExteriorDto;

    @ValidateNested()
    @Type(() => InteriorDto)
    interior: InteriorDto;

    @ValidateNested()
    @Type(() => MecanicaDto)    
    mecanica: MecanicaDto;

    @ValidateNested()
    @Type(() => ElementosDto)
    elementos: ElementosDto;

    @ValidateNested()
    @Type(() => CargaDto)
    carga: CargaDto;

    @ValidateNested()
    @Type(() => IzajeDto)
    izaje: IzajeDto;
}