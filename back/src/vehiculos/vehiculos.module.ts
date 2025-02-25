import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vehiculo } from './entities/vehiculo.entity';
import { VehiculosService } from './vehiculos.service';
import { VehiculosController } from './vehiculos.controller';
import { CommonModule } from 'src/common/common.module';

@Module({
  imports: [

    TypeOrmModule.forFeature([Vehiculo]),


    CommonModule

  ],
  controllers: [VehiculosController],
  providers: [VehiculosService],
})
export class VehiculosModule {}
