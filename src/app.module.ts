import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MongooseModule } from '@nestjs/mongoose';
import { CatController } from './ui/controller/cat.controller';
import { CatService } from './service/cat.service';
import CatMongooseRepository from './infra/cat.mongoose.repository';
import { CatSchema, CatSchemaClass } from './infra/schema/cat.schema';
import { join } from 'path';

@Module({
  imports: [
    // MongooseModule.forRoot('mongodb://localhost:27017', {
    //   auth: { username: 'root', password: 'password' },
    //   dbName: 'test',
    // })
    MongooseModule.forRoot('mongodb://localhost:27017/test?authSource=admin', {
      auth: { username: 'root', password: 'password' },
    }),
    MongooseModule.forFeature([
      { name: CatSchemaClass.name, schema: CatSchema },
    ]),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'password',
      database: 'test',
      entities: [join(__dirname, '/**/*.entity.js')],
      synchronize: true, // false가 안전함
    }),
  ],
  controllers: [CatController],
  providers: [
    CatService,
    {
      provide: 'CAT_REPOSITORY',
      useClass: CatMongooseRepository,
    },
  ],
})
export class AppModule {}
