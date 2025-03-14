import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { FormulariosService } from './formularios.service';
import { CreateFormularioDto } from './dto/create-formulario.dto';
import { UpdateFormularioDto } from './dto/update-formulario.dto';

import { PaginationDto } from 'src/common/dto/pagination.dto';

import { Auth } from 'src/auth/decorators/auth.decorator';
import { ValidRoles } from 'src/auth/interfaces';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Formulario } from './entities/formulario.entity';


@Controller('formularios')
export class FormulariosController {
  constructor(private readonly formulariosService: FormulariosService) {}

  @Post()
  @Auth(ValidRoles.operario)
  @ApiOperation({ summary: 'Crea un nuevo formulario' })
  @ApiResponse({ status: 201, description: 'Formulario creado exitosamente', type: Formulario })
  @ApiResponse({ status: 400, description: 'Error en los datos enviados' })
  @ApiResponse({ status: 401, description: 'Necesita estar autenticado para ingresar a esta ruta' })
  @ApiResponse({ status: 403, description: 'Necesita un rol valido(operario) para ingresar a esta ruta' })
  create(@Body() createFormularioDto: CreateFormularioDto) {
    return this.formulariosService.create(createFormularioDto);
  }

  @Get()
  @Auth()
  @ApiOperation({ summary: 'Devuelve todos los formularios' })
  @ApiResponse({ status: 200, description: 'Lista de formularios', type: [Formulario] })
  @ApiResponse({ status: 401, description: 'Necesita estar autenticado para ingresar a esta ruta' })
  findAll(@Query() paginationDto: PaginationDto) {
    return this.formulariosService.findAll(paginationDto);
  }

  @Get(':id')
  @Auth()
  @ApiOperation({ summary: 'Devuelve un formulario por su id' })
  @ApiResponse({ status: 200, description: 'Formulario encontrado', type: Formulario })
  @ApiResponse({ status: 404, description: 'Formulario no encontrado' })
  @ApiResponse({ status: 401, description: 'Necesita estar autenticado para ingresar a esta ruta' })
  findOne(@Param('id') id: string) {
    return this.formulariosService.findOne(id);
  }

  @Patch(':id')
  @Auth(ValidRoles.operario, ValidRoles.encargado)
  @ApiOperation({ summary: 'Actualiza un formulario por id' })
  @ApiResponse({ status: 200, description: 'Formulario actualizado', type: Formulario })
  @ApiResponse({ status: 400, description: 'Error en los datos enviados' })
  @ApiResponse({ status: 401, description: 'Necesita estar autenticado para ingresar a esta ruta' })
  @ApiResponse({ status: 403, description: 'Necesita un rol valido(operario, encargado) para ingresar a esta ruta' })
  @ApiResponse({ status: 404, description: 'Formulario no encontrado' })
  update(
    @Param('id') id: string,
    @Body() updateFormularioDto: UpdateFormularioDto
    ) {
    return this.formulariosService.update(id, updateFormularioDto);
  }

  @Patch(':id/aprobarForm')
  @Auth(ValidRoles.encargado)
  @ApiOperation({ summary: 'Aprueba un formulario por id' })
  @ApiResponse({ status: 200, description: 'Formulario aprobado' })
  approveForm(@Param('id') id: string) {
    return this.formulariosService.approveForm(id);
  }

  @Patch(':id/rechazarForm')
  @Auth(ValidRoles.encargado)
  @ApiOperation({ summary: 'Rechaza un formulario por id' })
  @ApiResponse({ status: 200, description: 'Formulario rechazado'})
  rejectForm(@Param('id') id: string) {
    return this.formulariosService.rejectForm(id);
  }

}
