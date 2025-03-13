import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

import { User } from './entities/user.entity';
import { CommonModule } from 'src/common/common.module';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  imports: [

    ConfigModule,

    TypeOrmModule.forFeature([User]),


    PassportModule.register({ defaultStrategy: 'jwt' }),

       JwtModule.registerAsync({
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: ( configService: ConfigService ) => {

            return {
                secret: configService.get('JWT_SECRET'),
                signOptions: {
                    expiresIn: '2h'
                }
            }
        }
       }),

    CommonModule
  ],
  exports: [ TypeOrmModule, PassportModule, JwtModule, JwtStrategy, AuthService]
})
export class AuthModule {}
