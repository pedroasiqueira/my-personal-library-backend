import { IsDateString, IsEmail, IsString, IsNotEmpty } from "class-validator";

export class CreateUserDto {
    @IsString()
    name: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;
}
