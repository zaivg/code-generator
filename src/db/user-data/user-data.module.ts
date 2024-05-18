import { Module } from '@nestjs/common';
import { UserDataService } from './user-data.service';

@Module({
  providers: [UserDataService]
})
export class UserDataModule {}
