import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { CommonService } from 'src/common/common.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { RegisterUserDto } from "./dto/register-user.dto";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private readonly commonService: CommonService,
        private readonly jwtService: JwtService
    ) { }

    async create(createUserDto: CreateUserDto): Promise<User> {
        try {
            const user = this.userRepository.create({
                ...createUserDto,
                passwordHash: createUserDto.password, // Temporary, will be hashed in entity
            });
            return await this.userRepository.save(user);
        } catch (error) {
            this.commonService.handleDBExceptions(error);
            // Ensure to return something or throw an error.
            throw error; // Or return null, or a default user, etc.
        }
    }

    async findAll(): Promise<User[]> {
        return this.userRepository.find({ where: { isActive: true } });
    }

    async findOne(id: number): Promise<User> {
        const user = await this.userRepository.findOneBy({ id, isActive: true });

        if (!user) {
            throw new NotFoundException('User not found');
        }
        return user;
    }

    async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
        await this.findOne(id); // Ensure user exists
        await this.userRepository.update(id, updateUserDto);
        return this.findOne(id);
    }

    async remove(id: number): Promise<void> {
        const user = await this.findOne(id);
        await this.userRepository.update(id, { isActive: false });
    }

    async register(registerUserDto: RegisterUserDto): Promise<{ accessToken: string; refreshToken: string }> {
        const { nombre, email, password, rol } = registerUserDto;

        // Create a new user entity
        const user = this.userRepository.create({
            nombre,
            email,
            passwordHash: password, // Map the password to passwordHash
            rol,
        });

        // Save the user to the database
        await this.userRepository.save(user);

        // Generate and return tokens
        return this.generateTokens(user);
    }

    // async register(registerUserDto: RegisterUserDto): Promise<{ accessToken: string; refreshToken: string }> {
    //     const user = this.userRepository.create(registerUserDto);
    //     await this.userRepository.save(user);
    //     return this.generateTokens(user);
    // }

    async login(authCredentialsDto: AuthCredentialsDto): Promise<{ accessToken: string; refreshToken: string }> {
        const { email, password } = authCredentialsDto;
        const user = await this.userRepository.findOneBy({ email, isActive: true });

        if (!user || !(await user.validatePassword(password))) {
            throw new UnauthorizedException('Invalid credentials');
        }

        return this.generateTokens(user);
    }

    private generateTokens(user: User): { accessToken: string; refreshToken: string } {
        const payload = { email: user.email, sub: user.id, rol: user.rol };
        const accessToken = this.jwtService.sign(payload);
        const refreshToken = this.jwtService.sign(payload, {
            secret: process.env.JWT_REFRESH_SECRET,
            expiresIn: process.env.JWT_REFRESH_EXPIRES_IN,
        });
        return { accessToken, refreshToken };
    }

    async refreshToken(refreshToken: string): Promise<{ accessToken: string }> {
        try {
            const payload = this.jwtService.verify(refreshToken, {
                secret: process.env.JWT_REFRESH_SECRET,
            });
            const user = await this.userRepository.findOneBy({ id: payload.sub });
            if (!user) {
                throw new UnauthorizedException('Invalid refresh token');
            }
            const accessToken = this.jwtService.sign({ email: user.email, sub: user.id, rol: user.rol });
            return { accessToken };
        } catch (error) {
            throw new UnauthorizedException('Invalid refresh token');
        }
    }
}