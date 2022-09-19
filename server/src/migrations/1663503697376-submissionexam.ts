import { MigrationInterface, QueryRunner } from "typeorm";

export class submissionexam1663503697376 implements MigrationInterface {
    name = 'submissionexam1663503697376'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`submission\` ADD \`assignementId\` int NULL`);
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
        await queryRunner.query(`ALTER TABLE \`submission\` ADD CONSTRAINT \`FK_46f813d6ba8dc7e5390e468fa34\` FOREIGN KEY (\`assignementId\`) REFERENCES \`assignement\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`submission\` DROP FOREIGN KEY \`FK_46f813d6ba8dc7e5390e468fa34\``);
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
        await queryRunner.query(`ALTER TABLE \`submission\` DROP COLUMN \`assignementId\``);
    }

}
