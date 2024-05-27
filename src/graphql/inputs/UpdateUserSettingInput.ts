import { Field, InputType, Int } from "@nestjs/graphql";

@InputType()
export class UpdateUserSettingsInput {
    @Field((type) => Int)
    userId: number

    @Field({nullable: true})
    receiveNotifications?: boolean

    @Field({nullable: true})
    receiveEmails?: boolean
}