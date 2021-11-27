import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import Cat from 'src/domain/entity/cat.entity';
import ICatRepository from 'src/domain/repository/cat.repository';
import { CatDocument, CatSchemaClass } from './schema/cat.schema';

@Injectable()
export default class CatMongooseRepository implements ICatRepository {
  constructor(
    @InjectModel(CatSchemaClass.name) private catModel: Model<CatDocument>,
  ) {}

  public async create(cat: Cat) {
    const createdCat = new this.catModel();

    createdCat.id = cat.getId();
    createdCat.name = cat.getName();
    createdCat.age = cat.getAge();
    createdCat.breed = cat.getBreed();

    await createdCat.save();
  }

  public async getOne(name: string) {
    const result = await this.catModel.findOne({ name: { $eq: name } }).exec();
    return new Cat(result.id, result.name, result.age, result.breed);
  }

  public async getAll() {
    const result = await this.catModel.find().exec();
    return result.map((cat) => new Cat(cat.id, cat.name, cat.age, cat.breed));
  }
}
