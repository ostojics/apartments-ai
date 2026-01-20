import {MigrationInterface, QueryRunner} from 'typeorm';

export class CreateKnowledgeBases1758657000400 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "knowledge_bases" (
        "id" uuid NOT NULL,
        "building_id" uuid NOT NULL,
        "tenant_id" uuid NOT NULL,
        "knowledge" text NOT NULL,
        "information" text NOT NULL,
        "metadata" jsonb NOT NULL DEFAULT '{}'::jsonb,
        "created_at" timestamp with time zone NOT NULL DEFAULT now(),
        CONSTRAINT "PK_knowledge_bases_id" PRIMARY KEY ("id"),
        CONSTRAINT "FK_knowledge_bases_building_id" FOREIGN KEY ("building_id") REFERENCES "buildings" ("id"),
        CONSTRAINT "FK_knowledge_bases_tenant_id" FOREIGN KEY ("tenant_id") REFERENCES "tenants" ("id")
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "knowledge_bases";`);
  }
}
