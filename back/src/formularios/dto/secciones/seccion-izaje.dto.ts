import { IsBoolean } from "class-validator";

export class IzajeDto {

  @IsBoolean()      
  fajas: boolean;

  @IsBoolean()
  grilletes: boolean;

  @IsBoolean()
  ganchos: boolean;
  
  @IsBoolean()
  malacate: boolean;

  @IsBoolean()
  estabilizadores: boolean;
}
