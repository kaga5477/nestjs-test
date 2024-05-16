import { Module } from "@nestjs/common";
import { UserResolver } from "./User.resolver";
import { UserService } from "./User.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "src/graphql/models/User";
import { UserSetting } from "src/graphql/models/UserSetting";
import { UserSettingService } from "./UserSetting.service";
import { UserSettingResolver } from "src/users/UserSetting.resolver";

@Module({
    imports: [TypeOrmModule.forFeature([User, UserSetting])],
    providers: [UserResolver, UserService, UserSettingService, UserSettingResolver]
})

export class UserModule {}