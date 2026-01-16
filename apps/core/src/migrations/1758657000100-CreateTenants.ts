import {MigrationInterface, QueryRunner} from 'typeorm';

export class CreateTenants1758657000100 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "tenants" (
        "id" uuid NOT NULL,
        "name" text NOT NULL,
        "slug" text NOT NULL,
        "created_at" timestamp with time zone NOT NULL DEFAULT now(),
        "license_id" uuid NOT NULL,
        CONSTRAINT "PK_tenants_id" PRIMARY KEY ("id"),
        CONSTRAINT "FK_tenants_license_id" FOREIGN KEY ("license_id") REFERENCES "licenses" ("id")
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "tenants";`);
  }
}
