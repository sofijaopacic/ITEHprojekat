import { MigrationInterface, QueryRunner } from "typeorm";

export class assignements1661804944398 implements MigrationInterface {
    name = 'assignements1661804944398'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`assignement\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`points\` int NOT NULL, \`required\` tinyint NOT NULL, \`description\` text NOT NULL, \`examId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`assignement\` ADD CONSTRAINT \`FK_52f4cc2d2e7aa79e3a61d79392c\` FOREIGN KEY (\`examId\`) REFERENCES \`exam\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`assignement\` DROP FOREIGN KEY \`FK_52f4cc2d2e7aa79e3a61d79392c\``);
        await queryRunner.query(`DROP TABLE \`assignement\``);
    }

}
