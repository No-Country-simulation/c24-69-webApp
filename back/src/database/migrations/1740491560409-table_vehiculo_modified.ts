import { MigrationInterface, QueryRunner } from "typeorm";

export class TableVehiculoModified1740491560409 implements MigrationInterface {
    name = 'TableVehiculoModified1740491560409'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "vehiculo" ADD "prueba" text`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "vehiculo" DROP COLUMN "prueba"`);
    }

}
