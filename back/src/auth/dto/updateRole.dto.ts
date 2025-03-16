import { IsArray, ArrayMinSize, IsString } from "class-validator";

export class UpdateRoleDto {
    @IsArray()
    @ArrayMinSize(1)
    @IsString({ each: true })
    rol: string[];
}
