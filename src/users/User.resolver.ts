import {
  Args,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { User } from '../graphql/models/User';
import { UserSetting } from '../graphql/models/UserSetting';
import { CreateUserInput } from '../graphql/dtos/CreateUserInput';
import { UserService } from './User.service';
import { UserSettingService } from './UserSetting.service';
import { UserReturnResult } from 'src/graphql/returns/UserReturnResult';
import { UpdateUserInput } from 'src/graphql/dtos/UpdateUserInput';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/guards/jwt-auth-guard';
import { ChangePasswordInput } from 'src/graphql/dtos/ChangePasswordInput';

@Resolver((of) => User)
export class UserResolver {
  constructor(
    private userService: UserService,
    //private userSettingService: UserSettingService,
  ) {}

  @Query((returns) => UserReturnResult, { nullable: true })
  getUserById(@Args('id', { type: () => Int }) id: number) {
    return this.userService.findUserById(id)
  }

  @Query(() => [User])
  @UseGuards(JwtAuthGuard)
  async getUsers() {
    return this.userService.getUsers();
  }

  // ** When you call getUser or getUserById, it calls getUserSettings to get settings
  // ** Else use relations in getUser and getUserById

  // @ResolveField((returns) => UserSetting, { name: 'settings', nullable: true })
  // getUserSettings(@Parent() user: User) {
  //   return this.userSettingService.findUserSettingsByUserId(user.id)
  // }

  @Mutation((returns) => UserReturnResult)
  @UseGuards(JwtAuthGuard)
  createUser(@Args('createUserData') createUserData: CreateUserInput) {
    return this.userService.createUser(createUserData);
  }

  @Mutation((returns) => UserReturnResult)
  deleteUserById(@Args('id') id: number) {
    return this.userService.deleteUserById(id)
  }

  @Mutation((returns) => UserReturnResult)
  async editUserById(
    @Args('updateUserData', { type: () => UpdateUserInput }) updateUserData: UpdateUserInput,
  ) {
    return this.userService.editUserById(updateUserData);
  }

  @Mutation((returns) => UserReturnResult)
  async changePassword(
    @Args('updatePassword', { type: () => ChangePasswordInput }) updatePassword: ChangePasswordInput,
  ) {
    return this.userService.changePassword(updatePassword);
  }
}
