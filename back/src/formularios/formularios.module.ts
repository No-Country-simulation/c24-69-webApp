import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Formulario } from './entities/formulario.entity';
import { FormulariosService } from './formularios.service';
import { FormulariosController } from './formularios.controller';
import { VehiculosModule } from 'src/vehiculos/vehiculos.module';

@Module({
  controllers: [FormulariosController],
  providers: [FormulariosService],
  imports: [

    TypeOrmModule.forFeature([Formulario]),

    VehiculosModule

  ]
})
export class FormulariosModule {}
