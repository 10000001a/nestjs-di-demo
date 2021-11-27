// import { Injectable } from '@nestjs/common';
// import { InjectModel } from '@nestjs/mongoose';
// import { Model } from 'mongoose';
// import ICatRepository from 'src/domain/repository/cat.repository';
// import { Cat, CatDocument } from 'src/infra/schema/cat.schema';

// @Injectable()
// export default class CatTypeormRepository implements ICatRepository {
//   constructor(@InjectModel(Cat.name) private catModel: Model<CatDocument>) {}

//   public async create(cat: Cat) {
//     const createdCat = new this.catModel(cat);
//     await createdCat.save();
//   }

//   public async getOne(name: string) {
//     const result = await this.catModel.findOne({ name: { $eq: name } }).exec();
//     return { name: result.name, age: result.age, breed: result.breed };
//   }

//   public async getAll() {
//     const result = await this.catModel.find().exec();
//     return result.map((cat) => ({
//       name: cat.name,
//       age: cat.age,
//       breed: cat.breed,
//     }));
//   }
// }
