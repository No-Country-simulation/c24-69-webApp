import { IsString, MinLength, IsEmail } from 'class-validator';

export class RegisterUserDto {
    @IsString()
    @MinLength(4)
    nombre: string;

    @IsEmail()
    email: string;

    @IsString()
    @MinLength(6)
    password: string;

    @IsString()
    rol: string;
}