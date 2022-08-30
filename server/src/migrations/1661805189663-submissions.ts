import { MigrationInterface, QueryRunner } from "typeorm";

export class submissions1661805189663 implements MigrationInterface {
    name = 'submissions1661805189663'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`submission\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`fileUrl\` varchar(255) NOT NULL, \`status\` enum ('pending', 'passed', 'failed') NOT NULL, \`fileName\` varchar(255) NOT NULL, \`points\` int NOT NULL, \`studentId\` int NULL, \`professorId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`submission\` ADD CONSTRAINT \`FK_a174d175dc504dce8df5c217014\` FOREIGN KEY (\`studentId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`submission\` ADD CONSTRAINT \`FK_7e06ee2b715475d055a0fcdf408\` FOREIGN KEY (\`professorId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`submission\` DROP FOREIGN KEY \`FK_7e06ee2b715475d055a0fcdf408\``);
        await queryRunner.query(`ALTER TABLE \`submission\` DROP FOREIGN KEY \`FK_a174d175dc504dce8df5c217014\``);
        await queryRunner.query(`DROP TABLE \`submission\``);
    }

}
