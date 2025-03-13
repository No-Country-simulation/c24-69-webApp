import { IsEmail, IsEnum, IsString, Matches, Max, MaxLength, MinLength } from "class-validator"
import { UserRolesList } from "../enums"
import { ValidRoles } from "../interfaces"

export class CreateUserDto {

    @IsString()
    @MinLength(1)
    @MaxLength(50)
    nombre: string

    @IsEmail()
    @MinLength(1)
    @MaxLength(60)
    email: string

    @IsString()
    @MinLength(1)
    @MaxLength(20)
    dni: string

    @IsString()
    @MinLength(6)
    @MaxLength(15)
    @Matches(
        /(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, { 
        message: 'La contraseña debe contener mayusculas, minusculas letras y numeros'
    })
    contraseña: string

    @IsEnum( UserRolesList, {
        message: `Los roles válidos son ${UserRolesList}`
    })
    rol: string
}