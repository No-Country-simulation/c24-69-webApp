import { MigrationInterface, QueryRunner } from "typeorm";

export class TableVehicle1740268946402 implements MigrationInterface {
    name = 'TableVehicle1740268946402'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "vehiculo" ("id" SERIAL NOT NULL, "modelo" text NOT NULL, "marca" text NOT NULL, "patente" text NOT NULL, "createdAt" date NOT NULL DEFAULT '"2025-02-23T00:02:28.784Z"', "updatedAt" date, "checkedAt" date, CONSTRAINT "UQ_d101967d5e19fd63fb28d711a70" UNIQUE ("marca"), CONSTRAINT "UQ_1cb1d76e17b31d290a68a76dfd3" UNIQUE ("patente"), CONSTRAINT "PK_79ad0f38366031fd4f2c1efdc62" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "vehiculo"`);
    }

}
