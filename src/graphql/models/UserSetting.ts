import { Column, Entity, PrimaryColumn } from "typeorm";
import { Field, Int, ObjectType } from "@nestjs/graphql";

@Entity({name: 'user_settings'})
@ObjectType()
export class UserSetting {
    @PrimaryColumn()
    @Field((type) => Int)
    userId: number;

    @Column({default: false})
    @Field({defaultValue: false})
    receiveNotifications: boolean;

    @Column({default: false})
    @Field({defaultValue: false})
    receiveEmails: boolean;
}