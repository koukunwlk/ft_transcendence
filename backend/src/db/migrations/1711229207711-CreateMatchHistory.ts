import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateMatchHistory1711229207711 implements MigrationInterface {
    name = 'CreateMatchHistory1711229207711'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "match_history" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "playerOneGoalsCount" integer, "playerTwoGoalsCount" integer, "matchType" character varying NOT NULL, "matchDuration" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "playerOneId" uuid, "playerTwoId" uuid, "winnerId" uuid, CONSTRAINT "PK_efc236c939f8248229d873f4893" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "match_history" ADD CONSTRAINT "FK_516088b849851b00a4e80e80dad" FOREIGN KEY ("playerOneId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "match_history" ADD CONSTRAINT "FK_b585a316d349facea1628cbb7f9" FOREIGN KEY ("playerTwoId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "match_history" ADD CONSTRAINT "FK_b2b9849ae12a3cf0ca6ddfa314b" FOREIGN KEY ("winnerId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "match_history" DROP CONSTRAINT "FK_b2b9849ae12a3cf0ca6ddfa314b"`);
        await queryRunner.query(`ALTER TABLE "match_history" DROP CONSTRAINT "FK_b585a316d349facea1628cbb7f9"`);
        await queryRunner.query(`ALTER TABLE "match_history" DROP CONSTRAINT "FK_516088b849851b00a4e80e80dad"`);
        await queryRunner.query(`DROP TABLE "match_history"`);
    }

}
