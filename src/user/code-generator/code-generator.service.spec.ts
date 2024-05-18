import { Test, TestingModule } from '@nestjs/testing';
import { CodeGeneratorService } from './code-generator.service';
import { HttpModule } from '@nestjs/axios';


describe('CodeGeneratorService', () => {
  let service: CodeGeneratorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CodeGeneratorService],
      imports: [HttpModule,]
    }).compile();

    service = module.get<CodeGeneratorService>(CodeGeneratorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
