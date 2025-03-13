import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Formulario } from './entities/formulario.entity';
import { CreateFormularioDto } from './dto/create-formulario.dto';
import { UpdateFormularioDto } from './dto/update-formulario.dto';

import { VehiculosService } from 'src/vehiculos/vehiculos.service';
import { AuthService } from 'src/auth/auth.service';

import { PaginationDto } from 'src/common/dto/pagination.dto';
import { FormStatus } from './enums';

@Injectable()
export class FormulariosService {

  constructor(
    @InjectRepository(Formulario)
    private readonly formularioRepository: Repository<Formulario>,

    private readonly vehiculoService: VehiculosService,

    private readonly authService: AuthService
  ){}


  async create(createFormularioDto: CreateFormularioDto) {
    
    try {
      // Creacion del formulario
      const patente = await this.vehiculoService.searchByPatente(createFormularioDto.patente)

      const operario = await this.authService.searchByName(createFormularioDto.operario)

      const formulario = this.formularioRepository.create({
        ...createFormularioDto,
        patente,
        operario
      })
      await this.formularioRepository.save(formulario)

      // Actualiza la fecha de chequeo del vehiculo
      await this.vehiculoService.updateCheckedAt(patente.id)

      return {
        message: 'Formulario creado con éxito',
        status: 201,
        formulario
      }
    } catch (error) {
      throw error
    }
  }

  async findAll(paginationDto: PaginationDto) {

    const { limit = 10, page = 1 } = paginationDto
    const totalForms = await this.formularioRepository.count()
    const totalPages = Math.ceil(totalForms / limit)

    const data = await this.formularioRepository.find({
      take: limit,
      skip: (page - 1) * limit,
      relations: {
        patente: true
      }
    })

    return {
      data,
      meta: {
        totalForms,
        totalPages,
        page,
        limit
      }
    }
  }

  async findOne(id: string) {
    
    try {
      const formulario = await this.formularioRepository.findOne({
        where: { id },
        relations: {
          patente: true
        }
      })
      if(!formulario){
        throw new NotFoundException('Formulario no encontrado')
      }
      return formulario
    } catch (error) {
      throw error
    }
  }

  async update(id: string, updateFormularioDto: UpdateFormularioDto) {

    try {

     const formulario = await this.formularioRepository.preload({
      id,
      ...updateFormularioDto,
      patente: { patente: updateFormularioDto.patente },
      operario: { nombre: updateFormularioDto.operario }
     })
      if(!formulario) {
        throw new NotFoundException('Formulario no encontrado')
      }

      await this.formularioRepository.save(formulario)


      return {
        message: 'Formulario actualizado con éxito',
        status: 200,
        formulario
      }

    } catch (error) {
      throw error
    }
  }


  async approveForm(id: string) {
    const form = await this.formularioRepository.update(id, { status: FormStatus.APROBADO })
    return {
      message: 'Formulario aprobado con éxito',
      status: 200,
    }
  }

  async rejectForm(id: string) {
    const form = await this.formularioRepository.update(id, { status: FormStatus.DESAPROBADO })
    return {
      message: 'Formulario rechazado con éxito',
      status: 200,
    }
  }

}
