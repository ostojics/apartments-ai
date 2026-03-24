import {MigrationInterface, QueryRunner} from 'typeorm';

export class CreateDeadLetterQueue1762100000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "dead_letter_queue" (
        "id" uuid NOT NULL,
        "outbox_id" uuid NOT NULL,
        "job_type" varchar NOT NULL,
        "payload" jsonb NOT NULL,
        "tenant_id" uuid NOT NULL,
        "error" text NOT NULL,
        "attempts" integer NOT NULL,
        "created_at" timestamp with time zone NOT NULL DEFAULT now(),
        "updated_at" timestamp with time zone NOT NULL DEFAULT now(),
        CONSTRAINT "PK_dead_letter_queue_id" PRIMARY KEY ("id"),
        CONSTRAINT "FK_dead_letter_queue_outbox_id" FOREIGN KEY ("outbox_id") REFERENCES "outbox" ("id"),
        CONSTRAINT "FK_dead_letter_queue_tenant_id" FOREIGN KEY ("tenant_id") REFERENCES "tenants" ("id")
      );
    `);

    await queryRunner.query(`CREATE INDEX "IDX_dead_letter_queue_outbox_id" ON "dead_letter_queue" ("outbox_id");`);
    await queryRunner.query(`CREATE INDEX "IDX_dead_letter_queue_tenant_id" ON "dead_letter_queue" ("tenant_id");`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX "IDX_dead_letter_queue_tenant_id";`);
    await queryRunner.query(`DROP INDEX "IDX_dead_letter_queue_outbox_id";`);
    await queryRunner.query(`DROP TABLE "dead_letter_queue";`);
  }
}
