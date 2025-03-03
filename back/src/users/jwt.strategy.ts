import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { User } from './entities/user.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly configService: ConfigService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.get<string>('JWT_SECRET') || 'fallback_secret_key', // Provide a fallback
        });
    }

    async validate(payload: any): Promise<Partial<User>> {
        return { id: payload.sub, email: payload.email, rol: payload.rol };
    }

    //   constructor(
    //     private readonly configService: ConfigService,
    //     @InjectRepository(User)
    //     private readonly userRepository: Repository<User>,
    //   ) {
    //     super({
    //       jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    //       ignoreExpiration: false,
    //       secretOrKey: configService.get<string>('JWT_SECRET') || 'fallback_secret_key',
    //     });
    //   }

    //   async validate(payload: any): Promise<User> {
    //     const user = await this.userRepository.findOneBy({ id: payload.sub });
    //     if (!user) {
    //       throw new UnauthorizedException('User not found');
    //     }
    //     return user;
    //   }
}