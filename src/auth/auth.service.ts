import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);
    if (user && await bcrypt.compare(password, (user as any).password)) {
      const { password, ...result } = (user as any).toObject(); // remove a senha da resposta
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { sub: user._id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async signup(data: { email: string; password: string; name: string }) {
    const existing = await this.usersService.findByEmail(data.email);
    if (existing) throw new UnauthorizedException('E-mail já cadastrado');

    const hashed = await bcrypt.hash(data.password, 10);
    const newUser = await this.usersService.create({ ...data, password: hashed });
    
    // Gerar token para o usuário recém-cadastrado
    const payload = { sub: newUser._id };
    return {
      user: newUser,
      access_token: this.jwtService.sign(payload),
    };
  }
}
