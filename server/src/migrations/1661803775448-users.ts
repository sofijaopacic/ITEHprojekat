import { MigrationInterface, QueryRunner } from "typeorm";

export class users1661803775448 implements MigrationInterface {
    name = 'users1661803775448'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`user\` (\`id\` int NOT NULL AUTO_INCREMENT, \`email\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`firstName\` varchar(255) NOT NULL, \`lastName\` varchar(255) NOT NULL, \`index\` varchar(255) NULL, \`type\` varchar(255) NOT NULL, INDEX \`IDX_31ef2b4d30675d0c15056b7f6e\` (\`type\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_31ef2b4d30675d0c15056b7f6e\` ON \`user\``);
        await queryRunner.query(`DROP TABLE \`user\``);
    }

}
