import { HttpCode, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { Vehiculo } from './entities/vehiculo.entity';
import { CreateVehiculoDto } from './dto/create-vehiculo.dto';
import { UpdateVehiculoDto } from './dto/update-vehiculo.dto';
import { CommonService } from 'src/common/common.service';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Injectable()
export class VehiculosService {

  constructor(
    @InjectRepository(Vehiculo)
    private readonly vehiculoRepository: Repository<Vehiculo>,

    private readonly commonService: CommonService,
  ) {}


  async create(createVehiculoDto: CreateVehiculoDto) {

    try {

      const vehiculo = this.vehiculoRepository.create(createVehiculoDto)
      await this.vehiculoRepository.save(vehiculo)
      return {
        message: 'Vehiculo creado correctamente',
        status: 201,
        data: vehiculo
      }

    } catch (error) {
      this.commonService.handleDBExceptions(error)
    }
  }

  async findAll(paginationDto: PaginationDto) {

    const { page = 1, limit = 10 } = paginationDto

    const totalVehiculos = await this.vehiculoRepository.count({where: {status: true}})
    const totalPages = Math.ceil(totalVehiculos / limit)

    const data = await this.vehiculoRepository.find({
      skip: (page - 1) * limit,
      take: limit,
      where: { status: true }
    })

    return{
      data,
      meta: {
        totalVehiculos,
        totalPages,
        page,
      }
    }
  }

  async findOne(id: number) {

    try {
      const vehiculo = await this.vehiculoRepository.findOneBy({id})
      if(!vehiculo) throw new NotFoundException('Vehiculo no encontrado')
      return vehiculo
    } catch (error) {
      throw error
    }
    
  }

  async update(id: number, updateVehiculoDto: UpdateVehiculoDto) {
    const vehiculo = this.vehiculoRepository.update(id, updateVehiculoDto)
    return {
      message: 'Vehiculo actualizado correctamente',
      status: 200,
      vehiculo
    }
    
  }

  async remove(id: number) {
    const vehiculo = await this.findOne(id)
    await this.vehiculoRepository.update(id, {status: false})
    return {
      message: 'Vehiculo eliminado correctamente',
      status: 200,
      vehiculo
    }
  }
}
