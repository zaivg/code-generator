import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { EmailService } from '@/email/email.service';
import { CodeGeneratorService } from '@/user/code-generator/code-generator.service';

describe('UserService', () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService, EmailService,],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
