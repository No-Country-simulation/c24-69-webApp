import { MigrationInterface, QueryRunner } from "typeorm";

export class TableVehiculosUpdated1740435394456 implements MigrationInterface {
    name = 'TableVehiculosUpdated1740435394456'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "vehiculo" ADD "status" boolean NOT NULL DEFAULT true`);
        await queryRunner.query(`ALTER TABLE "vehiculo" ALTER COLUMN "createdAt" DROP DEFAULT`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "vehiculo" ALTER COLUMN "createdAt" SET DEFAULT '2025-02-23'`);
        await queryRunner.query(`ALTER TABLE "vehiculo" DROP COLUMN "status"`);
    }

}
