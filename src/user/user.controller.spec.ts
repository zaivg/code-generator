import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { CodeGeneratorService } from '@/user/code-generator/code-generator.service';
import { EmailService } from '@/email/email.service';
import { UserData } from '@db/user-data/entities/userData.entity'; 
import { CreateUserDto } from '@db/user-data/dto/create-user.dto';
import { UpdateUserInfoDto } from '@db/user-data/dto/update-user-info.dto';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { mailerConfig } from '@root/mailer.config';
import { HttpModule } from '@nestjs/axios';

