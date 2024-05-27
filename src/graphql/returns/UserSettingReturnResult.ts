import { Field, Int, ObjectType } from "@nestjs/graphql"
import { UserSetting } from "../models/UserSetting";

@ObjectType()
export class UserSettingReturnResult {
    @Field((type) => Int)
    statusCode: number

    @Field({nullable: true})
    message?: string

    @Field((type) => UserSetting, {nullable: true})
    data?: UserSetting | null
}