import { Injectable } from '@nestjs/common';
import { CreateUserInput } from 'src/graphql/utils/CreateUserInput';
import { UserService } from 'src/users/User.service';
import { hash } from 'bcryptjs';

@Injectable()
export class SignUpService {
  constructor(private userService: UserService) {}

  async execute(input: CreateUserInput) {
    const password = await hash(input.password, 8);
    const user = this.userService.createUser({
      ...input,
      password,
    });
    return user;
  }
}