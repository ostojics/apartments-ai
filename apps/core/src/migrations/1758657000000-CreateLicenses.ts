import {MigrationInterface, QueryRunner} from 'typeorm';

export class CreateLicenses1758657000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "licenses" (
        "id" uuid NOT NULL,
        "key" uuid NOT NULL DEFAULT gen_random_uuid(),
        "created_at" timestamp with time zone NOT NULL DEFAULT now(),
        "expires_at" timestamp with time zone NOT NULL,
        "used_at" timestamp with time zone,
        "allowed_buildings" integer NOT NULL DEFAULT 1,
        "metadata" jsonb NOT NULL DEFAULT '{}'::jsonb,
        CONSTRAINT "PK_licenses_id" PRIMARY KEY ("id"),
        CONSTRAINT "UQ_licenses_key" UNIQUE ("key")
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "licenses";`);
  }
}
