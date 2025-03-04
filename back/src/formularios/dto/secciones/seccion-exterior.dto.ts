import { IsBoolean } from "class-validator";

export class ExteriorDto {

  @IsBoolean()  
  carroceria: boolean;

  @IsBoolean()
  limpieza: boolean;

  @IsBoolean()
  vidrios: boolean;

  @IsBoolean()
  luces: boolean;

  @IsBoolean()
  neumaticos: boolean;

  @IsBoolean()
  llantas: boolean;
}
