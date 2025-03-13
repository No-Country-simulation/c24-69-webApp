import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseIntPipe } from '@nestjs/common';

import { VehiculosService } from './vehiculos.service';
import { CreateVehiculoDto } from './dto/create-vehiculo.dto';
import { UpdateVehiculoDto } from './dto/update-vehiculo.dto';

import { PaginationDto } from 'src/common/dto/pagination.dto';

import { Auth } from 'src/auth/decorators/auth.decorator';
import { ValidRoles } from 'src/auth/interfaces';

@Controller('vehiculos')
export class VehiculosController {
  constructor(private readonly vehiculosService: VehiculosService) {}

  @Post()
  @Auth(ValidRoles.operario)
  create(@Body() createVehiculoDto: CreateVehiculoDto) {
    return this.vehiculosService.create(createVehiculoDto);
  }

  @Get()
  @Auth()
  findAll(@Query() paginationDto: PaginationDto) { 
    return this.vehiculosService.findAll(paginationDto);
  }

  @Get(':id')
  @Auth()
  findOne(@Param('id', ParseIntPipe) id: string) {
    return this.vehiculosService.findOne(+id);
  }

  @Patch(':id')
  @Auth(ValidRoles.operario)
  update(
    @Param('id', ParseIntPipe) id: string,
    @Body() updateVehiculoDto: UpdateVehiculoDto
    ) {
    return this.vehiculosService.update(+id, updateVehiculoDto);
  }

  @Delete(':id')
  @Auth(ValidRoles.operario)
  remove(@Param('id', ParseIntPipe) id: string) {
    return this.vehiculosService.remove(+id);
  }
}
