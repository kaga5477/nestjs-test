import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/graphql/models/User';
import { CreateUserInput } from 'src/graphql/dtos/CreateUserInput';
import { UpdateUserInput } from 'src/graphql/dtos/UpdateUserInput';
import { Repository } from 'typeorm';
import { ChangePasswordInput } from 'src/graphql/dtos/ChangePasswordInput';
import { compare, hash } from 'bcryptjs';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  getUsers() {
    return this.userRepository.find({ relations: ['settings'] });
  }

  async createUser(createUserData: CreateUserInput) {
    try {
      const user = await this.userRepository.findOne({
        where: { username: createUserData.username }
      });

      if (user) {
        return {
          statusCode: 500,
          message: `User already exist.`,
        };
      }

      const newUser = this.userRepository.create(createUserData);
      const saveUser = this.userRepository.save(newUser);
      return {
        statusCode: 200,
        message: `Create user succesfully.`,
        data: saveUser,
      };
    } catch (error) {
      return {
        statusCode: 500,
        message: error.message || 'Internal Server Error',
      };
    }
  }

  async findUserById(id: number) {
    try {
      const user = await this.userRepository.findOne({
        where: { id },
        relations: ['settings'],
      });
      
      if (!user) {
        return {
          statusCode: 404,
          message: `User not found.`,
        };
      }
      return {
        statusCode: 200,
        message: `Get user succesfully.`,
        data: user,
      };
    } catch (error) {
      return {
        statusCode: 500,
        message: error.message || 'Internal Server Error',
      };
    }
  }

  async getByUsername(username: string) {
    try {
      const user = await this.userRepository.findOne({
        where: { username },
        relations: ['settings'],
      });
      
      if (!user) {
        return {
          statusCode: 404,
          message: `User not found.`,
        };
      }
      return {
        statusCode: 200,
        message: `Get user succesfully.`,
        data: user,
      };
    } catch (error) {
      return {
        statusCode: 500,
        message: error.message || 'Internal Server Error',
      };
    }
  }

  async deleteUserById(id: number) {
    try {
      const userToDelete = await this.userRepository.findOneBy({ id });
      if (!userToDelete) {
        return {
          statusCode: 404,
          message: `User not found.`,
        };
      }
      this.userRepository.remove(userToDelete);
      return {
        statusCode: 200,
        message: `Delete user succesfully.`,
        data: userToDelete,
      };
    } catch (error) {
      return {
        statusCode: 500,
        message: error.message || 'Internal Server Error',
      };
    }
  }

  async editUserById(updateUserData: UpdateUserInput) {
    try {
      const existingUser = await this.userRepository.findOne({
        where: { id: updateUserData.id },
        relations: ['settings'],
      });

      if (!existingUser) {
        return {
          statusCode: 404,
          message: `User not found.`,
        };
      }

      // Update the existing user with the new data
      this.userRepository.merge(existingUser, updateUserData);

      const updatedUser = await this.userRepository.save(existingUser);

      return {
        statusCode: 200,
        message: `Edit user successfully.`,
        data: updatedUser,
      };
    } catch (error) {
      return {
        statusCode: 500,
        message: error.message || 'Internal Server Error',
      };
    }
  }

  async changePassword(updatePassword: ChangePasswordInput) {
    try {
      const user = await this.userRepository.findOne({
        where: { id: updatePassword.id },
      });

      if (!user) {
        return {
          statusCode: 404,
          message: `User not found.`,
        };
      }

      const passwordHasMatch = await compare(updatePassword.password, user.password);
      if (!passwordHasMatch) {
        return {
          statusCode: 500,
          message: `Password is not correct.`,
        };
      }
      // Update the existing user with the new data
      
      const newPassword = await hash(updatePassword.newPassword, 8);
      updatePassword.password = newPassword
      this.userRepository.merge(user, updatePassword);

      const updatedUser = await this.userRepository.save(user);

      return {
        statusCode: 200,
        message: `Password changed successfully.`,
        data: updatedUser,
      };
    } catch (error) {
      return {
        statusCode: 500,
        message: error.message || 'Internal Server Error',
      };
    }
  }
}
