import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseIntPipe } from '@nestjs/common';

import { VehiculosService } from './vehiculos.service';
import { CreateVehiculoDto } from './dto/create-vehiculo.dto';
import { UpdateVehiculoDto } from './dto/update-vehiculo.dto';

import { PaginationDto } from 'src/common/dto/pagination.dto';

import { Auth } from 'src/auth/decorators/auth.decorator';
import { ValidRoles } from 'src/auth/interfaces';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Vehiculo } from './entities/vehiculo.entity';

@Controller('vehiculos')
export class VehiculosController {
  constructor(private readonly vehiculosService: VehiculosService) {}

  @Post()
  @Auth(ValidRoles.operario)
  @ApiOperation({ summary: 'Crea un nuevo vehiculo' })
  @ApiResponse({ status: 201, description: 'Vehiculo creado exitosamente', type: Vehiculo })
  @ApiResponse({ status: 400, description: 'Error en los datos enviados' })
  @ApiResponse({ status: 401, description: 'Necesita estar autenticado para ingresar a esta ruta' })
  @ApiResponse({ status: 403, description: 'Necesita un rol valido(operario) para ingresar a esta ruta' })
  create(@Body() createVehiculoDto: CreateVehiculoDto) {
    return this.vehiculosService.create(createVehiculoDto);
  }

  @Get()
  @Auth()
  @ApiOperation({ summary: 'Devuelve todos los vehiculos' })
  @ApiResponse({ status: 200, description: 'Lista de vehiculos', type: [Vehiculo] })
  @ApiResponse({ status: 401, description: 'Necesita estar autenticado para ingresar a esta ruta' })
  findAll(@Query() paginationDto: PaginationDto) { 
    return this.vehiculosService.findAll(paginationDto);
  }

  @Get(':id')
  @Auth()
  @ApiOperation({ summary: 'Devuelve un vehiculo por su id' })
  @ApiResponse({ status: 200, description: 'Vehiculo encontrado', type: Vehiculo })
  @ApiResponse({ status: 401, description: 'Necesita estar autenticado para ingresar a esta ruta' })
  @ApiResponse({ status: 404, description: 'Vehiculo no encontrado' })
  findOne(@Param('id', ParseIntPipe) id: string) {
    return this.vehiculosService.findOne(+id);
  }

  @Patch(':id')
  @Auth(ValidRoles.operario)
  @ApiOperation({ summary: 'Actualiza un vehiculo por id' })
  @ApiResponse({ status: 200, description: 'Vehiculo actualizado', type: Vehiculo })
  @ApiResponse({ status: 400, description: 'Error en los datos enviados' })
  @ApiResponse({ status: 401, description: 'Necesita estar autenticado para ingresar a esta ruta' })
  @ApiResponse({ status: 403, description: 'Necesita un rol valido(operario) para ingresar a esta ruta' })
  @ApiResponse({ status: 404, description: 'Vehiculo no encontrado' })
  update(
    @Param('id', ParseIntPipe) id: string,
    @Body() updateVehiculoDto: UpdateVehiculoDto
    ) {
    return this.vehiculosService.update(+id, updateVehiculoDto);
  }

  @Delete(':id')
  @Auth(ValidRoles.operario)
  @ApiOperation({ summary: 'Elimina un vehiculo por id' })
  @ApiResponse({ status: 200, description: 'Vehiculo eliminado' })
  @ApiResponse({ status: 401, description: 'Necesita estar autenticado para ingresar a esta ruta' })
  @ApiResponse({ status: 403, description: 'Necesita un rol valido(operario) para ingresar a esta ruta' })
  @ApiResponse({ status: 404, description: 'Vehiculo no encontrado' })
  remove(@Param('id', ParseIntPipe) id: string) {
    return this.vehiculosService.remove(+id);
  }
}
