import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from 'src/guards/passport-strategy';
import { UserModule } from 'src/users/users.module';
import { AuthenticateService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthResolver } from './auth.resolver';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserService } from 'src/users/User.service';
import { User } from 'src/graphql/models/User';
import { SignUpService } from './signup.service';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (config: ConfigService) => ({
        secret: config.get('JWT_SECRET'),
        signOptions: { expiresIn: config.get('JWT_EXP') },
      }),
      inject: [ConfigService],
    }),
    UserModule,
    TypeOrmModule.forFeature([User]),
  ],
  providers: [AuthResolver, JwtStrategy, AuthenticateService, UserService, SignUpService, ConfigService],
  exports: [JwtStrategy, JwtModule],
})
export class AuthModule {}