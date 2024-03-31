import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateFriendRequest1711897624848 implements MigrationInterface {
    name = 'UpdateFriendRequest1711897624848'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "friend_request" DROP COLUMN "sender"`);
        await queryRunner.query(`ALTER TABLE "friend_request" DROP COLUMN "receiver"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "friend_request" ADD "receiver" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "friend_request" ADD "sender" uuid NOT NULL`);
    }

}
