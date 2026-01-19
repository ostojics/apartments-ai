import {MigrationInterface, QueryRunner} from 'typeorm';

export class CreateContacts1758657000500 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "contacts" (
        "id" uuid NOT NULL,
        "name" text NOT NULL,
        "email" text NOT NULL,
        "phone_number" text,
        "preferred_language" text NOT NULL,
        "tenant_id" uuid NOT NULL,
        "created_at" timestamp with time zone NOT NULL DEFAULT now(),
        CONSTRAINT "PK_contacts_id" PRIMARY KEY ("id"),
        CONSTRAINT "FK_contacts_tenant_id" FOREIGN KEY ("tenant_id") REFERENCES "tenants" ("id")
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "contacts";`);
  }
}
