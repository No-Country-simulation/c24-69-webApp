import { MigrationInterface, QueryRunner } from "typeorm";

export class TableVehiculoUpdated1740437798538 implements MigrationInterface {
    name = 'TableVehiculoUpdated1740437798538'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "vehiculo" DROP CONSTRAINT "UQ_d101967d5e19fd63fb28d711a70"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "vehiculo" ADD CONSTRAINT "UQ_d101967d5e19fd63fb28d711a70" UNIQUE ("marca")`);
    }

}
