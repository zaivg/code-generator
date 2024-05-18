import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from '@/user/user.module';
import { ConfigModule } from '@nestjs/config';
import { DBConnectionModule } from '@db/db-connection.module';
import { UserDataModule } from './db/user-data/user-data.module';
import { EmailService } from './email/email.service';
import { EmailModule } from './email/email.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { mailerConfig } from '@root/mailer.config';


@Module({
  imports: [ConfigModule.forRoot(), 
    MailerModule.forRoot(mailerConfig),
    DBConnectionModule, 
    UserModule, UserDataModule, EmailModule],
  controllers: [AppController],
  providers: [AppService, EmailService],
})
export class AppModule {}
