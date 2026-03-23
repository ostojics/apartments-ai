import {MigrationInterface, QueryRunner} from 'typeorm';

export class CreateVouchersAndOutbox1761000000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "vouchers" (
        "id" uuid NOT NULL,
        "code" varchar(32) NOT NULL,
        "discount_percent" integer NOT NULL DEFAULT 10,
        "expires_at" timestamp with time zone NOT NULL,
        "status" varchar(16) NOT NULL DEFAULT 'issued',
        "email" varchar(320),
        "tenant_id" uuid NOT NULL,
        "metadata" jsonb,
        "redeemed_at" timestamp with time zone,
        "created_at" timestamp with time zone NOT NULL DEFAULT now(),
        "updated_at" timestamp with time zone NOT NULL DEFAULT now(),
        CONSTRAINT "PK_vouchers_id" PRIMARY KEY ("id"),
        CONSTRAINT "UQ_vouchers_code" UNIQUE ("code"),
        CONSTRAINT "FK_vouchers_tenant_id" FOREIGN KEY ("tenant_id") REFERENCES "tenants" ("id")
      );
    `);

    await queryRunner.query(`CREATE INDEX "IDX_vouchers_expires_at" ON "vouchers" ("expires_at");`);
    await queryRunner.query(`CREATE INDEX "IDX_vouchers_email" ON "vouchers" ("email");`);

    await queryRunner.query(`
      CREATE TABLE "outbox" (
        "id" uuid NOT NULL,
        "job_type" varchar NOT NULL,
        "payload" jsonb NOT NULL,
        "tenant_id" uuid NOT NULL,
        "status" varchar(16) NOT NULL DEFAULT 'pending',
        "attempts" integer NOT NULL DEFAULT 0,
        "sent_at" timestamp with time zone,
        "last_error" text,
        "result" jsonb,
        "created_at" timestamp with time zone NOT NULL DEFAULT now(),
        "updated_at" timestamp with time zone NOT NULL DEFAULT now(),
        CONSTRAINT "PK_outbox_id" PRIMARY KEY ("id"),
        CONSTRAINT "FK_outbox_tenant_id" FOREIGN KEY ("tenant_id") REFERENCES "tenants" ("id")
      );
    `);

    await queryRunner.query(`CREATE INDEX "IDX_outbox_status" ON "outbox" ("status");`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX "IDX_outbox_status";`);
    await queryRunner.query(`DROP TABLE "outbox";`);
    await queryRunner.query(`DROP INDEX "IDX_vouchers_email";`);
    await queryRunner.query(`DROP INDEX "IDX_vouchers_expires_at";`);
    await queryRunner.query(`DROP TABLE "vouchers";`);
  }
}
