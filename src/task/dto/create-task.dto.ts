import { IsEmpty, IsNotEmpty, IsString } from "class-validator";
import { User } from "../../auth/schemas/user.schema";


export class CreateTaskDto{
    @IsNotEmpty()
    @IsString()
    readonly title: string

    @IsEmpty({ message: "You cannot pass user id"})
    readonly user: User
}