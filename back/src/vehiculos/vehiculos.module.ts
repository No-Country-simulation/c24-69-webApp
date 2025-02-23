import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vehiculo } from './entities/vehiculo.entity';
import { VehiculosService } from './vehiculos.service';
import { VehiculosController } from './vehiculos.controller';

@Module({
  imports: [

    TypeOrmModule.forFeature([Vehiculo]),

  ],
  controllers: [VehiculosController],
  providers: [VehiculosService],
})
export class VehiculosModule {}
