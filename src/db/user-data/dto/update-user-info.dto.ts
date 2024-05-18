import { IsDate, IsDefined, IsEmail, IsString, MaxLength } from "class-validator";

export class UpdateUserInfoDto {
    
    @IsString() 
    @IsDefined()
    @MaxLength(255)
    firstName: string;
    
    @IsString()
    @IsDefined()
    @MaxLength(255)
    lastName: string;
    
}
