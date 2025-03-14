import { ArrayMinSize, IsArray, IsEmail, IsEnum, IsString, Matches, Max, MaxLength, MinLength, ValidateNested } from "class-validator"
import { UserRolesList } from "../enums"
import { ValidRoles } from "../interfaces"
import { ApiProperty } from "@nestjs/swagger"
import { Type } from "class-transformer"

export class CreateUserDto {


    @ApiProperty({
        example: 'Juan Perez',
        description: 'Nombre del usuario',
        type: 'string',
        uniqueItems: true,
        nullable: false
    })
    @IsString()
    @MinLength(1)
    @MaxLength(50)
    nombre: string


    @ApiProperty({
        example: 'alguien@gmail.com',
        description: 'Correo del usuario',
        type: 'string',
        nullable: false,
        uniqueItems: true
    })
    @IsEmail()
    @MinLength(1)
    @MaxLength(60)
    email: string


    @ApiProperty({
        example: '24851090',
        description: 'DNI del usuario',
        type: 'string',
        uniqueItems: true,
        nullable: false
    })
    @IsString()
    @MinLength(1)
    @MaxLength(20)
    dni: string


    @ApiProperty({
        example: 'Abc123',
        description: 'Contraseña del usuario',
        type: 'string',
        nullable: false,
    })
    @IsString()
    @MinLength(6)
    @MaxLength(15)
    @Matches(
        /(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, { 
        message: 'La contraseña debe contener mayusculas, minusculas letras y numeros'
    })
    contraseña: string

    @IsArray()
    @ArrayMinSize(1)
    @ValidateNested({ each: true })
    @Type (() => String)
    rol: string[]
}