import { Field, Int, ObjectType } from "@nestjs/graphql"
import { User } from "../models/User";

@ObjectType()
export class UserReturnResult {
    @Field((type) => Int)
    statusCode: number

    @Field({nullable: true})
    message?: string

    @Field((type) => User, {nullable: true})
    data?: User | null
}