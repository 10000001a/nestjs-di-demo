import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Cat, CatSchema } from './domain/schema/cat.schema';
import CatMongooseRepository from './infra/cat.mongoose.repository';

@Module({
  imports: [
    // MongooseModule.forRoot('mongodb://localhost:27017', {
    //   auth: { username: 'root', password: 'password' },
    //   dbName: 'test',
    // })
    MongooseModule.forRoot('mongodb://localhost:27017/test?authSource=admin', {
      auth: { username: 'root', password: 'password' },
    }),
    MongooseModule.forFeature([{ name: Cat.name, schema: CatSchema }]),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    CatMongooseRepository,
    {
      provide: 'CAT_REPOSITORY',
      useClass: CatMongooseRepository,
    },
  ],
})
export class AppModule {}
