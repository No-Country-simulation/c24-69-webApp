import { IsString, MinLength, IsEmail } from 'class-validator';

export class CreateUserDto {
    @IsString()
    @MinLength(4)
    nombre: string;

    @IsString()
    @MinLength(6)
    password: string;

    @IsEmail()
    email: string;
}