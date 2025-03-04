import { IsBoolean } from "class-validator";

export class CargaDto {

  @IsBoolean()  
  cadenas: boolean;

  @IsBoolean()  
  correas: boolean;

  @IsBoolean()  
  soportes: boolean;

  @IsBoolean()  
  avisos: boolean;
}
