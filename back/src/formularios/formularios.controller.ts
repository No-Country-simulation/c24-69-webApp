import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { FormulariosService } from './formularios.service';
import { CreateFormularioDto } from './dto/create-formulario.dto';
import { UpdateFormularioDto } from './dto/update-formulario.dto';

import { PaginationDto } from 'src/common/dto/pagination.dto';

import { Auth } from 'src/auth/decorators/auth.decorator';
import { ValidRoles } from 'src/auth/interfaces';


@Controller('formularios')
export class FormulariosController {
  constructor(private readonly formulariosService: FormulariosService) {}

  @Post()
  @Auth(ValidRoles.operario)
  create(@Body() createFormularioDto: CreateFormularioDto) {
    return this.formulariosService.create(createFormularioDto);
  }

  @Get()
  @Auth()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.formulariosService.findAll(paginationDto);
  }

  @Get(':id')
  @Auth()
  findOne(@Param('id') id: string) {
    return this.formulariosService.findOne(id);
  }

  @Patch(':id')
  @Auth(ValidRoles.operario, ValidRoles.encargado)
  update(
    @Param('id') id: string,
    @Body() updateFormularioDto: UpdateFormularioDto
    ) {
    return this.formulariosService.update(id, updateFormularioDto);
  }

  @Patch(':id/aprobarForm')
  @Auth(ValidRoles.encargado)
  approveForm(@Param('id') id: string) {
    return this.formulariosService.approveForm(id);
  }

  @Patch(':id/rechazarForm')
  @Auth(ValidRoles.encargado)
  rejectForm(@Param('id') id: string) {
    return this.formulariosService.rejectForm(id);
  }

}
