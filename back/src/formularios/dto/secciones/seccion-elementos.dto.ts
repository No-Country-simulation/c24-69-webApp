import { IsBoolean } from "class-validator";

export class ElementosDto {

  @IsBoolean()  
  herramientas: boolean;
  
  @IsBoolean()
  repuestoNeumatico: boolean;

  @IsBoolean()
  botiquin: boolean;

  @IsBoolean()
  tacos: boolean;

  @IsBoolean()
  extintor: boolean;

  @IsBoolean()
  linterna: boolean;

  @IsBoolean()
  crique: boolean;
}
