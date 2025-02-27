import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { CommonModule } from 'src/common/common.module';
import { AuthController } from './auth.controller';

@Module({
    imports: [TypeOrmModule.forFeature([User]), CommonModule],
    controllers: [UsersController, AuthController],
    providers: [UsersService],
})
export class UsersModule {}