import { MigrationInterface, QueryRunner } from "typeorm";

export class exams1661804712263 implements MigrationInterface {
    name = 'exams1661804712263'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`exam\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`semester\` int NOT NULL, \`espb\` int NOT NULL, \`professorId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`student_exams\` (\`exam_id\` int NOT NULL, \`student_id\` int NOT NULL, INDEX \`IDX_b8b97a1aceb7010f89551911b6\` (\`exam_id\`), INDEX \`IDX_d508bf3ef4de12e8d06ec8209d\` (\`student_id\`), PRIMARY KEY (\`exam_id\`, \`student_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`exam\` ADD CONSTRAINT \`FK_d13e02e30e86bbf25e5e3e7bee8\` FOREIGN KEY (\`professorId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`student_exams\` ADD CONSTRAINT \`FK_b8b97a1aceb7010f89551911b6d\` FOREIGN KEY (\`exam_id\`) REFERENCES \`exam\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`student_exams\` ADD CONSTRAINT \`FK_d508bf3ef4de12e8d06ec8209dc\` FOREIGN KEY (\`student_id\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`student_exams\` DROP FOREIGN KEY \`FK_d508bf3ef4de12e8d06ec8209dc\``);
        await queryRunner.query(`ALTER TABLE \`student_exams\` DROP FOREIGN KEY \`FK_b8b97a1aceb7010f89551911b6d\``);
        await queryRunner.query(`ALTER TABLE \`exam\` DROP FOREIGN KEY \`FK_d13e02e30e86bbf25e5e3e7bee8\``);
        await queryRunner.query(`DROP INDEX \`IDX_d508bf3ef4de12e8d06ec8209d\` ON \`student_exams\``);
        await queryRunner.query(`DROP INDEX \`IDX_b8b97a1aceb7010f89551911b6\` ON \`student_exams\``);
        await queryRunner.query(`DROP TABLE \`student_exams\``);
        await queryRunner.query(`DROP TABLE \`exam\``);
    }

}
