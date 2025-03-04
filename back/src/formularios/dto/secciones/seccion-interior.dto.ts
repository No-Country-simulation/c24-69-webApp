import { IsBoolean } from "class-validator";

export class InteriorDto {
   
  @IsBoolean()  
  tablero: boolean;

  @IsBoolean()  
  tacografo: boolean;

  @IsBoolean()  
  limpieza: boolean;

  @IsBoolean()  
  asientos: boolean;

  @IsBoolean()  
  aireYcalefaccion: boolean;
}
