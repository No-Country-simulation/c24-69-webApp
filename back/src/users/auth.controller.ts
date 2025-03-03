import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { RegisterUserDto } from "./dto/register-user.dto";

@Controller('auth')
export class AuthController {
    constructor(private readonly usersService: UsersService) { }

    @Post('register')
    async register(@Body() registerUserDto: RegisterUserDto) {
        return this.usersService.register(registerUserDto);
    }

    @Post('login')
    async login(@Body() authCredentialsDto: AuthCredentialsDto) {
        return this.usersService.login(authCredentialsDto);
    }

    @Post('refresh-token')
    async refreshToken(@Body('refreshToken') refreshToken: string) {
        return this.usersService.refreshToken(refreshToken);
    }

    // @Post('login')
    // async login(@Body() authCredentialsDto: AuthCredentialsDto) {
    //     try {
    //         const user = await this.usersService.login(authCredentialsDto);
    //         // In a real application, you'd generate a JWT here.
    //         return { message: 'Login successful', user };
    //     } catch (error) {
    //         if (error instanceof UnauthorizedException) {
    //             throw error;
    //         }
    //         throw error;
    //     }
    // }
}