import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { CommonService } from 'src/common/common.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { RegisterUserDto } from "./dto/register-user.dto";

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private readonly commonService: CommonService,
    ) {}

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

    async register(registerUserDto: RegisterUserDto): Promise<User> {
        try {
            const user = this.userRepository.create({
                ...registerUserDto,
                passwordHash: registerUserDto.password, // Temporary, will be hashed in entity
            });
            return await this.userRepository.save(user);
        } catch (error) {
            this.commonService.handleDBExceptions(error);
            throw error;
        }
    }

    async login(authCredentialsDto: AuthCredentialsDto): Promise<User> {
        const { email, password } = authCredentialsDto;
        const user = await this.userRepository.findOneBy({ email, isActive: true });

        if (!user || !(await user.validatePassword(password))) {
            throw new UnauthorizedException('Invalid credentials');
        }

        return user;
    }
}