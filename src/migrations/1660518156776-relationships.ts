import { MigrationInterface, QueryRunner } from "typeorm";

export class relationships1660518156776 implements MigrationInterface {
    name = 'relationships1660518156776'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users_addresses_addresses" ("usersId" uuid NOT NULL, "addressesId" uuid NOT NULL, CONSTRAINT "PK_5b86d57df71ccc8290d8a8e3b10" PRIMARY KEY ("usersId", "addressesId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_e64aa444ebcd1a999fca5c6d75" ON "users_addresses_addresses" ("usersId") `);
        await queryRunner.query(`CREATE INDEX "IDX_f4a14656154013ccd7d6bc0202" ON "users_addresses_addresses" ("addressesId") `);
        await queryRunner.query(`ALTER TABLE "users" ADD "password" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "comments" ADD "announcementId" uuid`);
        await queryRunner.query(`ALTER TABLE "comments" ADD "userId" uuid`);
        await queryRunner.query(`ALTER TABLE "images" ADD "announcementId" uuid`);
        await queryRunner.query(`ALTER TABLE "announcements" ADD "userId" uuid`);
        await queryRunner.query(`ALTER TABLE "comments" ADD CONSTRAINT "FK_2bf4aa41d384038daf10e39a8e8" FOREIGN KEY ("announcementId") REFERENCES "announcements"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comments" ADD CONSTRAINT "FK_7e8d7c49f218ebb14314fdb3749" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "images" ADD CONSTRAINT "FK_fac6198a89ec23116ca0352104d" FOREIGN KEY ("announcementId") REFERENCES "announcements"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "announcements" ADD CONSTRAINT "FK_1968b95a7c6d64a81b1b3b5aad4" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users_addresses_addresses" ADD CONSTRAINT "FK_e64aa444ebcd1a999fca5c6d75d" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "users_addresses_addresses" ADD CONSTRAINT "FK_f4a14656154013ccd7d6bc02029" FOREIGN KEY ("addressesId") REFERENCES "addresses"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users_addresses_addresses" DROP CONSTRAINT "FK_f4a14656154013ccd7d6bc02029"`);
        await queryRunner.query(`ALTER TABLE "users_addresses_addresses" DROP CONSTRAINT "FK_e64aa444ebcd1a999fca5c6d75d"`);
        await queryRunner.query(`ALTER TABLE "announcements" DROP CONSTRAINT "FK_1968b95a7c6d64a81b1b3b5aad4"`);
        await queryRunner.query(`ALTER TABLE "images" DROP CONSTRAINT "FK_fac6198a89ec23116ca0352104d"`);
        await queryRunner.query(`ALTER TABLE "comments" DROP CONSTRAINT "FK_7e8d7c49f218ebb14314fdb3749"`);
        await queryRunner.query(`ALTER TABLE "comments" DROP CONSTRAINT "FK_2bf4aa41d384038daf10e39a8e8"`);
        await queryRunner.query(`ALTER TABLE "announcements" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "images" DROP COLUMN "announcementId"`);
        await queryRunner.query(`ALTER TABLE "comments" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "comments" DROP COLUMN "announcementId"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "password"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_f4a14656154013ccd7d6bc0202"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_e64aa444ebcd1a999fca5c6d75"`);
        await queryRunner.query(`DROP TABLE "users_addresses_addresses"`);
    }

}
