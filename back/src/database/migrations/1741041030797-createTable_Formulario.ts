import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTableFormulario1741041030797 implements MigrationInterface {
    name = 'CreateTableFormulario1741041030797'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "vehiculo" RENAME COLUMN "prueba" TO "formularioId"`);
        await queryRunner.query(`CREATE TYPE "public"."formulario_status_enum" AS ENUM('APROBADO', 'POSPUESTO', 'PENDIENTE')`);
        await queryRunner.query(`CREATE TABLE "formulario" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "status" "public"."formulario_status_enum" NOT NULL DEFAULT 'PENDIENTE', "observaciones" text, "arreglo" text, "createdAt" date NOT NULL, "secciones" jsonb NOT NULL, CONSTRAINT "PK_df4c9b155eb3a62815065cec3f9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "vehiculo" DROP COLUMN "formularioId"`);
        await queryRunner.query(`ALTER TABLE "vehiculo" ADD "formularioId" uuid`);
        await queryRunner.query(`ALTER TABLE "vehiculo" ADD CONSTRAINT "FK_6794a29b185b44fe5ab448aee0c" FOREIGN KEY ("formularioId") REFERENCES "formulario"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "vehiculo" DROP CONSTRAINT "FK_6794a29b185b44fe5ab448aee0c"`);
        await queryRunner.query(`ALTER TABLE "vehiculo" DROP COLUMN "formularioId"`);
        await queryRunner.query(`ALTER TABLE "vehiculo" ADD "formularioId" text`);
        await queryRunner.query(`DROP TABLE "formulario"`);
        await queryRunner.query(`DROP TYPE "public"."formulario_status_enum"`);
        await queryRunner.query(`ALTER TABLE "vehiculo" RENAME COLUMN "formularioId" TO "prueba"`);
    }

}
