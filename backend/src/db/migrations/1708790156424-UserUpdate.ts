import { MigrationInterface, QueryRunner } from "typeorm";

export class UserUpdate1708790156424 implements MigrationInterface {
    name = 'UserUpdate1708790156424'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "token" character varying`);
        await queryRunner.query(`ALTER TABLE "user" ADD "status" integer`);
        await queryRunner.query(`ALTER TABLE "user" ADD "validCode" boolean`);
        await queryRunner.query(`ALTER TABLE "user" ADD "userId" character varying`);
        await queryRunner.query(`ALTER TABLE "user" ADD "email" character varying`);
        await queryRunner.query(`ALTER TABLE "user" ADD "username" character varying`);
        await queryRunner.query(`ALTER TABLE "user" ADD "tfaSecret" character varying`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "nickname" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "nickname" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "tfaSecret"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "username"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "email"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "validCode"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "status"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "token"`);
    }

}
