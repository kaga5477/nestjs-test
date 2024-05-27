import { Field, Int, ObjectType } from "@nestjs/graphql"
import { User } from "src/graphql/models/User"

@ObjectType()
export class LoginReturnResult {
    @Field({nullable: true})
    token?: string | null

    @Field((type) => User, {nullable: true})
    data?: User | null
}