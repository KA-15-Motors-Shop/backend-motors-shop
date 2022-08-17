import { MigrationInterface, QueryRunner } from "typeorm";

export class softDeleteAnnouncement1660742206826 implements MigrationInterface {
    name = 'softDeleteAnnouncement1660742206826'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "announcements" ADD "is_active" boolean NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "announcements" DROP COLUMN "is_active"`);
    }

}
