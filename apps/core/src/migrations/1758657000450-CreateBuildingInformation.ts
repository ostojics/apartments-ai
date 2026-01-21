import {MigrationInterface, QueryRunner} from 'typeorm';

export class CreateBuildingInformation1758657000450 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "building_information" (
        "id" uuid NOT NULL,
        "knowledge_base_id" uuid NOT NULL,
        "locale" text NOT NULL,
        "content" text NOT NULL,
        "created_at" timestamp with time zone NOT NULL DEFAULT now(),
        CONSTRAINT "PK_building_information_id" PRIMARY KEY ("id"),
        CONSTRAINT "FK_building_information_knowledge_base_id" FOREIGN KEY ("knowledge_base_id") REFERENCES "knowledge_bases" ("id")
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "building_information";`);
  }
}
