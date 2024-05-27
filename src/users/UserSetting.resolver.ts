import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserSetting } from '../graphql/models/UserSetting';
import { CreateUserSettingsInput } from '../graphql/inputs/CreateUserSettingsInput';
import { UserSettingService } from 'src/users/UserSetting.service';
import { UserSettingReturnResult } from 'src/graphql/returns/UserSettingReturnResult';
import { UpdateUserSettingsInput } from 'src/graphql/inputs/UpdateUserSettingInput';

@Resolver()
export class UserSettingResolver {
  constructor(private userSettingsService: UserSettingService) {}

  @Query(() => [UserSetting])
  getAllUserSettings() {
    return this.userSettingsService.getAllUserSettings();
  }

  @Mutation((returns) => UserSettingReturnResult)
  async createUserSettings(
    @Args('createUserSettingsData')
    createUserSettingsData: CreateUserSettingsInput,
  ) {
    const userSettings = this.userSettingsService.createUserSettings(
      createUserSettingsData,
    );
    return userSettings;
  }

  @Mutation((returns) => UserSettingReturnResult)
  async editUserSettingsByUserId(
    @Args('updateUserSettingData', { type: () => UpdateUserSettingsInput })
    updateUserSettingData: UpdateUserSettingsInput,
  ) {
    return this.userSettingsService.editUserSettingsByUserId(updateUserSettingData);
  }
}
