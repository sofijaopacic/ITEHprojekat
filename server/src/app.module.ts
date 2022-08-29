import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "",
    database: "evidence",
    logging: false,
    entities: [],
    migrations: ["src/migrations/**/*.ts"],
  })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
