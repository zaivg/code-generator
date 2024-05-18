import { IsDate, IsDefined, IsEmail, IsString, MaxLength } from "class-validator";

export class CreateUserDto {
    
    @IsString() 
    @IsDefined()
    @MaxLength(255)
    firstName: string;
    
    @IsString()
    @IsDefined()
    @MaxLength(255)
    lastName: string;
    
    @IsEmail()
    @IsDefined()
    @MaxLength(255)
    eMail: string;

    @IsString()
    @MaxLength(6)
    code: string;

    @IsDate()
    codeExpiredDT: Date;

}
