import { Field, InputType, Int } from "@nestjs/graphql";

@InputType()
export class ChangePasswordInput {
    @Field((type) => Int)
    id: number;
    
    @Field()
    password: string

    @Field()
    newPassword: string
}