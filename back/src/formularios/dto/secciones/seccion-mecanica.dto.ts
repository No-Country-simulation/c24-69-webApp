import { IsBoolean } from "class-validator";

export class MecanicaDto {

  @IsBoolean()  
  suspension: boolean;

  @IsBoolean()  
  mangueras: boolean;

  @IsBoolean()  
  aceite: boolean;

  @IsBoolean()  
  frenos: boolean;

  @IsBoolean()  
  direccion: boolean;

  @IsBoolean()  
  agua: boolean;

  @IsBoolean()  
  bateria: boolean;
}
