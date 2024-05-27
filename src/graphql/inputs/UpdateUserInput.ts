import { Field, InputType, Int } from "@nestjs/graphql";

@InputType()
export class UpdateUserInput {
    @Field((type) => Int)
    id: number;
    
    @Field({nullable: true})
    username?: string

    @Field({nullable: true})
    displayName?: string
}