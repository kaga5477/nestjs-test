import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { save } from 'postgre';
import { User } from 'src/graphql/models/User';
import { UserSetting } from 'src/graphql/models/UserSetting';
import { CreateUserSettingsInput } from 'src/graphql/dtos/CreateUserSettingsInput';
import { UpdateUserSettingsInput } from 'src/graphql/dtos/UpdateUserSettingInput';
import { Repository } from 'typeorm';

@Injectable()
export class UserSettingService {
  constructor(
    @InjectRepository(UserSetting)
    private userSettingRepository: Repository<UserSetting>,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  getAllUserSettings() {
    return this.userSettingRepository.find();
  }

  async createUserSettings(createUserSettingsData: CreateUserSettingsInput) {
    try {
      const findUser = await this.userRepository.findOneBy({
        id: createUserSettingsData.userId,
      });
      if (!findUser)
        return {
          statusCode: 404,
          message: `User settings not found.`,
        };

      const newUserSetting = this.userSettingRepository.create(
        createUserSettingsData,
      );
      const savedSettings =
        await this.userSettingRepository.save(newUserSetting);

      findUser.settings = savedSettings;
      await this.userRepository.save(findUser);

      return {
        statusCode: 200,
        message: `Create user setttings successfully.`,
        data: savedSettings,
      };
    } catch (error) {
      return {
        statusCode: 500,
        message: error.message || 'Internal Server Error',
      };
    }
  }

  findUserSettingsByUserId(userId: number) {
    return this.userSettingRepository.findOneBy({ userId });
  }

  async editUserSettingsByUserId(
    updateUserSettingData: UpdateUserSettingsInput,
  ) {
    try {
      const existingUserSetting = await this.userSettingRepository.findOneBy({
        userId: updateUserSettingData.userId,
      });

      if (!existingUserSetting) {
        return {
          statusCode: 404,
          message: `User settings not found.`,
        };
      }

      this.userSettingRepository.merge(
        existingUserSetting,
        updateUserSettingData,
      );
      const updatedUserSetting =
        await this.userSettingRepository.save(existingUserSetting);

      return {
        statusCode: 200,
        message: `Edit user setttings successfully.`,
        data: updatedUserSetting,
      };
    } catch (error) {
      return {
        statusCode: 500,
        message: error.message || 'Internal Server Error',
      };
    }
  }
}
