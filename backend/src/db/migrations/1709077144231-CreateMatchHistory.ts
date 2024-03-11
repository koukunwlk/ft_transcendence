import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateMatchHistory1709077144231 implements MigrationInterface {
    name = 'CreateMatchHistory1709077144231'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "match_history" ("id" uuid NOT NULL, "playerOneId" uuid NOT NULL, "playerOneGoalsCount" integer, "playerTwoId" uuid NOT NULL, "playerTwoGoalsCount" integer, "winnerId" uuid, "matchType" character varying NOT NULL, "matchDuration" character varying, "createdAt" TIMESTAMP NOT NULL, "updatedAt" TIMESTAMP NOT NULL, CONSTRAINT "PK_efc236c939f8248229d873f4893" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "match_history"`);
    }

}
