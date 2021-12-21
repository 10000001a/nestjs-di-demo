import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';

import { CatController } from './ui/controller/cat.controller';
import { CatService } from './service/cat.service';
import CatTypeormRepository from './infra/repository/cat.typeorm.repostiory';
import { Cat } from './infra/entity/cat.entity';
import CatValidator from './domain/service/cat.validator';

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
      entities: [join(__dirname, '/**/*.entity.js')],
      // domain/entity.cat.entity.ts 와 infra/entity/cat.entity.ts 사이의 혼란이 있을까 걱정했는데, Typeorm이 알아서 Entity 데코레이터로 구분해주는 듯 하다.
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
    CatValidator,
  ],
})
export class AppModule {}
