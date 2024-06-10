import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { User } from '../graphql/models/User';
import { AuthenticateService } from './auth.service';
import { LoginReturnResult } from '../graphql/returns/LoginReturnResult';
import { UserService } from 'src/users/User.service';
import { SignUpService } from './signup.service';
import { CreateUserInput } from 'src/graphql/dtos/CreateUserInput';
import { UserReturnResult } from 'src/graphql/returns/UserReturnResult';

@Resolver((of) => User)
export class AuthResolver {
  constructor(private authenticateService: AuthenticateService, private signUpService: SignUpService) {}

  @Mutation((returns) => LoginReturnResult)
  login(
    @Args('username') username: string,
    @Args('password') password: string,
  ) {
    return this.authenticateService.execute(username, password);
  }

  @Mutation((returns) => UserReturnResult)
  signup(
    @Args('createUserData') createUserData: CreateUserInput,
  ) {
    return this.signUpService.execute(createUserData);
  }
}
