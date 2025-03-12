import { IsEmail, IsString, Matches, MaxLength, MinLength } from "class-validator"


export class LoginUserDto {

    @IsEmail()
    @MinLength(1)
    @MaxLength(60)
    email: string   

    @IsString()
    @MinLength(1)
    contraseña: string

}