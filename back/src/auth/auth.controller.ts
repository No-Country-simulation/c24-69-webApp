import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto, LoginUserDto, UpdateUserDto } from './dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';



@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() createUserDto: CreateUserDto ){
    return this.authService.register(createUserDto)
  }

  @Post('login')
  login(@Body() loginUserDto: LoginUserDto ){
    return this.authService.login(loginUserDto)
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto){
    return this.authService.findAll(paginationDto)
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: string){
    return this.authService.findOne(+id)
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: string,
    @Body() updateUserDto: UpdateUserDto
  ){
    return this.authService.update(+id, updateUserDto)
  }
  
}
