import {MigrationInterface, QueryRunner} from 'typeorm';

export class AddTenantIdToFeedback1758657000600 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Step 1: Add tenant_id column as nullable to avoid breaking existing deployments
    await queryRunner.query(`ALTER TABLE "feedback" ADD COLUMN "tenant_id" uuid;`);

    // Step 2: Backfill existing feedback records with the first tenant's ID to ensure migration works on previous versions
    await queryRunner.query(
      `UPDATE "feedback" SET "tenant_id" = (SELECT "id" FROM "tenants" ORDER BY "created_at" ASC LIMIT 1) WHERE "tenant_id" IS NULL;`,
    );

    // Step 3: Make tenant_id NOT NULL now that all records are backfilled
    await queryRunner.query(`ALTER TABLE "feedback" ALTER COLUMN "tenant_id" SET NOT NULL;`);

    // Step 4: Add foreign key constraint to enforce referential integrity
    await queryRunner.query(
      `ALTER TABLE "feedback" ADD CONSTRAINT "FK_feedback_tenant_id" FOREIGN KEY ("tenant_id") REFERENCES "tenants" ("id");`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "feedback" DROP CONSTRAINT "FK_feedback_tenant_id";`);
    await queryRunner.query(`ALTER TABLE "feedback" DROP COLUMN "tenant_id";`);
  }
}
