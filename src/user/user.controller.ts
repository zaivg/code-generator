import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Put, Res } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from '@db/user-data/dto/create-user.dto';
import { UpdateUserInfoDto } from '@db/user-data/dto/update-user-info.dto';


@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }


  @Get(':email')
  async getUser(@Param('email') email: string) {
    let res = this.userService.getUser(email);
    return res;
  }


  @Post()
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }


  @Patch(':id')
  async updUserInfo(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateUserInfoDto) {
    
      return this.userService.updUserInfo(id, body);

  }


  @Delete(':id')
  async deleteUser(@Param('id', ParseIntPipe) id: number) {
    return this.userService.deleteUser(id);
  }

}
