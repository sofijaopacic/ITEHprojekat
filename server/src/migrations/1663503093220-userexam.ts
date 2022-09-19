import { MigrationInterface, QueryRunner } from "typeorm";

export class userexam1663503093220 implements MigrationInterface {
    name = 'userexam1663503093220'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`user_exams\` (\`exam_id\` int NOT NULL, \`user_id\` int NOT NULL, INDEX \`IDX_f89d1ce687618e22a346ce676d\` (\`exam_id\`), INDEX \`IDX_155cd55a48b68f9bcf8186581a\` (\`user_id\`), PRIMARY KEY (\`exam_id\`, \`user_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`assignement\` DROP FOREIGN KEY \`FK_52f4cc2d2e7aa79e3a61d79392c\``);
        await queryRunner.query(`ALTER TABLE \`assignement\` CHANGE \`examId\` \`examId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`index\` \`index\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`exam\` DROP FOREIGN KEY \`FK_d13e02e30e86bbf25e5e3e7bee8\``);
        await queryRunner.query(`ALTER TABLE \`exam\` CHANGE \`professorId\` \`professorId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`submission\` DROP FOREIGN KEY \`FK_a174d175dc504dce8df5c217014\``);
        await queryRunner.query(`ALTER TABLE \`submission\` DROP FOREIGN KEY \`FK_7e06ee2b715475d055a0fcdf408\``);
        await queryRunner.query(`ALTER TABLE \`submission\` CHANGE \`studentId\` \`studentId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`submission\` CHANGE \`professorId\` \`professorId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`assignement\` ADD CONSTRAINT \`FK_52f4cc2d2e7aa79e3a61d79392c\` FOREIGN KEY (\`examId\`) REFERENCES \`exam\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`exam\` ADD CONSTRAINT \`FK_d13e02e30e86bbf25e5e3e7bee8\` FOREIGN KEY (\`professorId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`submission\` ADD CONSTRAINT \`FK_a174d175dc504dce8df5c217014\` FOREIGN KEY (\`studentId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`submission\` ADD CONSTRAINT \`FK_7e06ee2b715475d055a0fcdf408\` FOREIGN KEY (\`professorId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user_exams\` ADD CONSTRAINT \`FK_f89d1ce687618e22a346ce676da\` FOREIGN KEY (\`exam_id\`) REFERENCES \`exam\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`user_exams\` ADD CONSTRAINT \`FK_155cd55a48b68f9bcf8186581af\` FOREIGN KEY (\`user_id\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user_exams\` DROP FOREIGN KEY \`FK_155cd55a48b68f9bcf8186581af\``);
        await queryRunner.query(`ALTER TABLE \`user_exams\` DROP FOREIGN KEY \`FK_f89d1ce687618e22a346ce676da\``);
        await queryRunner.query(`ALTER TABLE \`submission\` DROP FOREIGN KEY \`FK_7e06ee2b715475d055a0fcdf408\``);
        await queryRunner.query(`ALTER TABLE \`submission\` DROP FOREIGN KEY \`FK_a174d175dc504dce8df5c217014\``);
        await queryRunner.query(`ALTER TABLE \`exam\` DROP FOREIGN KEY \`FK_d13e02e30e86bbf25e5e3e7bee8\``);
        await queryRunner.query(`ALTER TABLE \`assignement\` DROP FOREIGN KEY \`FK_52f4cc2d2e7aa79e3a61d79392c\``);
        await queryRunner.query(`ALTER TABLE \`submission\` CHANGE \`professorId\` \`professorId\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`submission\` CHANGE \`studentId\` \`studentId\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`submission\` ADD CONSTRAINT \`FK_7e06ee2b715475d055a0fcdf408\` FOREIGN KEY (\`professorId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`submission\` ADD CONSTRAINT \`FK_a174d175dc504dce8df5c217014\` FOREIGN KEY (\`studentId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`exam\` CHANGE \`professorId\` \`professorId\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`exam\` ADD CONSTRAINT \`FK_d13e02e30e86bbf25e5e3e7bee8\` FOREIGN KEY (\`professorId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`index\` \`index\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`assignement\` CHANGE \`examId\` \`examId\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`assignement\` ADD CONSTRAINT \`FK_52f4cc2d2e7aa79e3a61d79392c\` FOREIGN KEY (\`examId\`) REFERENCES \`exam\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`DROP INDEX \`IDX_155cd55a48b68f9bcf8186581a\` ON \`user_exams\``);
        await queryRunner.query(`DROP INDEX \`IDX_f89d1ce687618e22a346ce676d\` ON \`user_exams\``);
        await queryRunner.query(`DROP TABLE \`user_exams\``);
    }

}
