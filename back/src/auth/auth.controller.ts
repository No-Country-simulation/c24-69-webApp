import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto, LoginUserDto, UpdateUserDto } from './dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { User } from './entities/user.entity';
import { Auth } from './decorators/auth.decorator';
import { ValidRoles } from './interfaces';
import { UpdateRoleDto } from './dto/updateRole.dto';



@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'Crea un nuevo usuario y devuelve un JWT' })
  @ApiResponse({ status: 201, description: 'Usuario creado exitosamente', type: User })
  @ApiResponse({ status: 400, description: 'Error en los datos enviados' })
  register(@Body() createUserDto: CreateUserDto ){
    return this.authService.register(createUserDto)
  }

  @Post('login')
  @ApiOperation({ summary: 'Inicia sesión y devuelve un JWT' })
  @ApiResponse({ status: 201, description: 'Inicio de sesión exitoso'})
  @ApiResponse({ status: 401, description: 'Error en los datos enviados' })
  login(@Body() loginUserDto: LoginUserDto ){
    return this.authService.login(loginUserDto)
  }

  @Get()
  @Auth(ValidRoles.admin)
  @ApiOperation({ summary: 'Devuelve todos los usuarios' })
  @ApiResponse({ status: 200, description: 'Lista de usuarios', type: [User] })
  @ApiResponse({ status: 401, description: 'Necesita estar autenticado para ingresar a esta ruta' })
  @ApiResponse({ status: 403, description: 'Necesita un rol valido(admin) para ingresar a esta ruta' })
  findAll(@Query() paginationDto: PaginationDto){
    return this.authService.findAll(paginationDto)
  }

  @Get(':id')
  @Auth(ValidRoles.admin)
  @ApiOperation({ summary: 'Devuelve un usuario por id' })
  @ApiResponse({ status: 200, description: 'Usuario encontrado', type: User })
  @ApiResponse({ status: 401, description: 'Necesita estar autenticado para ingresar a esta ruta' })
  @ApiResponse({ status: 403, description: 'Necesita un rol valido(admin) para ingresar a esta ruta' })
  findOne(@Param('id', ParseIntPipe) id: string){
    console.log('Actualizando usuario con id:', id);
    console.log('Datos recibidos para actualizar:', UpdateUserDto);
    return this.authService.findOne(+id)
  }

  @Patch(':id')
  @Auth(ValidRoles.admin)
  @ApiOperation({ summary: 'Actualiza un usuario por id' })
  @ApiResponse({ status: 200, description: 'Usuario actualizado', type: User })
  @ApiResponse({ status: 400, description: 'Error en los datos enviados' })
  @ApiResponse({ status: 401, description: 'Necesita estar autenticado para ingresar a esta ruta' })
  @ApiResponse({ status: 403, description: 'Necesita un rol valido(admin) para ingresar a esta ruta' })
  update(
      @Param('id', ParseIntPipe) id: string,
      @Body() updateRoleDto: UpdateRoleDto
  ) {
      return this.authService.update(+id, updateRoleDto);
  }
  
}
