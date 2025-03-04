import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterTableFormulario1741041297908 implements MigrationInterface {
    name = 'AlterTableFormulario1741041297908'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "vehiculo" DROP CONSTRAINT "FK_6794a29b185b44fe5ab448aee0c"`);
        await queryRunner.query(`ALTER TABLE "vehiculo" DROP COLUMN "formularioId"`);
        await queryRunner.query(`ALTER TABLE "formulario" ADD "patenteId" integer`);
        await queryRunner.query(`ALTER TABLE "formulario" ADD CONSTRAINT "FK_58eae068584b2dac6e5c99aabb8" FOREIGN KEY ("patenteId") REFERENCES "vehiculo"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "formulario" DROP CONSTRAINT "FK_58eae068584b2dac6e5c99aabb8"`);
        await queryRunner.query(`ALTER TABLE "formulario" DROP COLUMN "patenteId"`);
        await queryRunner.query(`ALTER TABLE "vehiculo" ADD "formularioId" uuid`);
        await queryRunner.query(`ALTER TABLE "vehiculo" ADD CONSTRAINT "FK_6794a29b185b44fe5ab448aee0c" FOREIGN KEY ("formularioId") REFERENCES "formulario"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
