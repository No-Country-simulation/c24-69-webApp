import { IsBoolean, IsDateString } from "class-validator";

export class DocumentacionDto {

    @IsBoolean()
    tarjetaVerde: boolean;

    @IsDateString()
    seguroVto: Date;

    @IsDateString()
    rto: Date;

    @IsBoolean()
    tarjetaRuta: boolean;

    @IsDateString()
    licenciaConductor: Date;
}