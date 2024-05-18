import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserData } from '@db/user-data/entities/userData.entity';
import { CodeGeneratorService } from './code-generator/code-generator.service';
import { HttpModule } from '@nestjs/axios';
import { EmailService } from '@/email/email.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { mailerConfig } from '@root/mailer.config';


@Module({
  controllers: [UserController],
  providers: [UserService, CodeGeneratorService, EmailService],
  imports: [HttpModule,
    TypeOrmModule.forFeature([UserData]),
    MailerModule.forRoot(mailerConfig),
  ]
})
export class UserModule { }
