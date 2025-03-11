import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';

import { Formulario } from './entities/formulario.entity';
import { CreateFormularioDto } from './dto/create-formulario.dto';
import { UpdateFormularioDto } from './dto/update-formulario.dto';
import { VehiculosService } from 'src/vehiculos/vehiculos.service';

@Injectable()
export class FormulariosService {

  constructor(
    @InjectRepository(Formulario)
    private readonly formularioRepository: Repository<Formulario>,

    private readonly vehiculoService: VehiculosService
  ){}


  async create(createFormularioDto: CreateFormularioDto) {
    
    try {
      const patente = await this.vehiculoService.searchByPatente(createFormularioDto.patente)

      const formulario = this.formularioRepository.create({
        ...createFormularioDto,
        patente
      })
      await this.formularioRepository.save(formulario)
      return {
        message: 'Formulario creado con éxito',
        status: 201,
        formulario
      }
    } catch (error) {
      throw error
    }
  }

  findAll() {
    return `This action returns all formularios`;
  }

  findOne(id: number) {
    return `This action returns a #${id} formulario`;
  }

  update(id: number, updateFormularioDto: UpdateFormularioDto) {
    return `This action updates a #${id} formulario`;
  }

  remove(id: number) {
    return `This action removes a #${id} formulario`;
  }
}
