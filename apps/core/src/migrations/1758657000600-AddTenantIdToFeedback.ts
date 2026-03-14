import {MigrationInterface, QueryRunner} from 'typeorm';

export class AddTenantIdToFeedback1758657000600 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "feedback" ADD COLUMN "tenant_id" uuid NOT NULL;`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "feedback" DROP COLUMN "tenant_id";`);
  }
}
