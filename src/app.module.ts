import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';

import { CatController } from './ui/controller/cat.controller';
import { CatService } from './service/cat.service';
import CatTypeormRepository from './infra/cat.typeorm.repostiory';
import { Cat } from './infra/entity/cat.typeorm.entity';

@Module({
  imports: [
    // MongooseModule.forRoot('mongodb://localhost:27017', {
    //   auth: { username: 'root', password: 'password' },
    //   dbName: 'test',
    // })
    // MongooseModule.forRoot('mongodb://localhost:27017/test?authSource=admin', {
    //   auth: { username: 'root', password: 'password' },
    // }),
    // MongooseModule.forFeature([
    //   { name: CatSchemaClass.name, schema: CatSchema },
    // ]),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'user',
      password: 'password',
      database: 'test',
      entities: [join(__dirname, '/**/*.typeorm.entity.js')],
      synchronize: true, // false가 안전함
    }),
    TypeOrmModule.forFeature([Cat]),
  ],
  controllers: [CatController],
  providers: [
    {
      provide: 'CAT_REPOSITORY',
      // useClass: CatMongooseRepository,
      useClass: CatTypeormRepository,
    },
    CatService,
  ],
})
export class AppModule {}
