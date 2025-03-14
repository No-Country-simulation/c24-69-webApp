import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsString, Matches, MaxLength, MinLength } from "class-validator"


export class LoginUserDto {


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
        example: 'Abc123',
        description: 'Contraseña del usuario',
        type: 'string',
        nullable: false,
    })
    @IsString()
    @MinLength(1)
    contraseña: string

}