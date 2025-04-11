import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersService } from '../users/users.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private usersService: UsersService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'chave-secreta-isaque',
    });
  }

  async validate(payload: any) {
    // Verifica se o usuário ainda existe no banco de dados
    const user = await this.usersService.findOne(payload.sub);
    
    if (!user) {
      throw new UnauthorizedException('Usuário não existe ou token inválido');
    }
    
    return { userId: payload.sub };
  }
}
