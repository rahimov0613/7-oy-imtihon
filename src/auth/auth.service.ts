import { Injectable } from '@nestjs/common';
import { RegisterInput } from './dto/register-auth.input';
import { LoginInput } from './dto/login-auth.input.';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserModel } from 'src/users/entities/user.model';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) { }
  async register(registerAuth: RegisterInput) {
    const uniqueEmail = await this.userService.findByEmail(registerAuth.email);
    if (uniqueEmail) {
      throw new Error('Email already exists');
    }
    const hashedPassword = await bcrypt.hash(registerAuth.password, 10);
    return this.userService.create({
      ...registerAuth,
      password: hashedPassword,
    })
  }

  async login(loginInput: LoginInput) {
    const user = await this.userService.findByEmail(loginInput.email);
    if (!user) {
      throw new Error('User not found');
    }
    const isMAtch = await bcrypt.compare(loginInput.password, user.password);
    if (!isMAtch) {
      throw new Error('Invalid password');
    }
   const payload = { sub: user.id, email: user.email, role: user.role };
    const accessToken = this.jwtService.sign(payload);
    return accessToken;
  }
}