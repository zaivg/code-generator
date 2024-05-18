import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from '@db/user-data/dto/create-user.dto';
import { UpdateUserInfoDto } from '@db/user-data/dto/update-user-info.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CodeGeneratorService } from './code-generator/code-generator.service';
import { UserData } from '@db/user-data/entities/userData.entity';
import { QueryFailedError, Repository } from 'typeorm';
import { lastValueFrom } from 'rxjs';
import { EmailService } from '@/email/email.service';


@Injectable()
export class UserService {
  constructor(private readonly codeGeneratorService: CodeGeneratorService,
    private readonly emailService: EmailService,
    @InjectRepository(UserData) private readonly userDataRepository: Repository<UserData>,
  ) { }

  async getUser(email: string) {
    const user = await this.userDataRepository.findOne({
      select: ['id', 'firstName', 'lastName', 'eMail'],
      where: { eMail: email },
    });

    if (!user) {
      throw new NotFoundException(`User with email '${email}' not found`);
    }
    return user;

  }

  async createUser(createUserDto: CreateUserDto): Promise<any> {
    createUserDto.code = await lastValueFrom(this.codeGeneratorService.generateCode());

    let dtCodeExpired = new Date();
    dtCodeExpired.setMinutes(dtCodeExpired.getMinutes() + (+process.env.CODE_VALIDITY_MN));
    createUserDto.codeExpiredDT = dtCodeExpired;

    try {
      const resp = await this.userDataRepository.save(createUserDto);
      this.sendEmail(createUserDto.eMail, createUserDto.code);
      return resp;

    } catch (err) {
      console.error('<save>, ERROR : ', err);

      if (err instanceof QueryFailedError) {
        const sErrMsgCustom = this.getErrMsgCustom(err.message)
        console.error(sErrMsgCustom);
        throw new NotFoundException('Failed to create user: ' + sErrMsgCustom);
      } else {
        console.error('Another error:', err.message);
      }

    }
  }


  async updUserInfo(id: number, updateUserInfoDto: UpdateUserInfoDto) {
    const result = await this.userDataRepository.update(id, updateUserInfoDto);
    if (result.affected === 0) {
      throw new Error(`User with id ${id} not found`);
    }
    return result;
  }


  async deleteUser(id: number) {
    const result = await this.userDataRepository.delete(id);
   
    if (result.affected === 0) {
      throw new Error(`User with id ${id} not found`);
    }
    return result;
  }


  /* PRIVATE FUNCTIONS: */
  private getErrMsgCustom(sErrMsgOrigin) {
    let sErrMsg = "";
    let sVal = "";
    let iStart = 0;

    if (sErrMsgOrigin.includes('Violation of UNIQUE KEY constraint')) {
      const sPRE_VAL = "The duplicate key value is";
      iStart = sErrMsgOrigin.search(sPRE_VAL) + sPRE_VAL.length;
      sVal = sErrMsgOrigin.substring(++iStart, sErrMsgOrigin.length - 1);

      sErrMsg = `The 'email' field must be unique, but an account with the value '${sVal}' already exists.`

    } else {
      sErrMsg = sErrMsgOrigin;
    }

    return sErrMsg;

  }


  private sendEmail(eMail, code) {
    const mailMessage = `Your code is:\n${code}\nValid for 5 minutes!`;

    try {
      this.emailService.sendEmail(eMail, "Your Code", mailMessage);
    } catch (error) {
      console.error(error.message);
    }
  }

}
