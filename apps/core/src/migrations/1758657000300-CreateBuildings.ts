import {MigrationInterface, QueryRunner} from 'typeorm';

export class CreateBuildings1758657000300 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "buildings" (
        "id" uuid NOT NULL,
        "name" text NOT NULL,
        "slug" text NOT NULL,
        "created_at" timestamp with time zone NOT NULL DEFAULT now(),
        "tenant_id" uuid NOT NULL,
        "image_url" text,
        CONSTRAINT "PK_buildings_id" PRIMARY KEY ("id"),
        CONSTRAINT "FK_buildings_tenant_id" FOREIGN KEY ("tenant_id") REFERENCES "tenants" ("id")
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "buildings";`);
  }
}
