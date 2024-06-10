import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/users/User.service';
import { compare } from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthenticateService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}
  async execute(username: string, password: string) {
    const user = await this.userService.getByUsername(username);
    if (!user) {
        return {
            token: 'Cannot find user',
            data: null,
          };
    }
    const passwordHasMatch = await compare(password, user.data.password);
    if (!passwordHasMatch) {
        return {
            token: null,
            data: null,
          };
    }
    const payload = { subject: user.data.id, user_name: user.data.username };
    return {
      token: this.jwtService.sign(payload),
      data: user.data,
    };
  }
}