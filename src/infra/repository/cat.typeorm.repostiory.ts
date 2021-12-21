import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Cat as TypeOrmCat } from 'src/infra/entity/cat.entity';
import ICatRepository from 'src/domain/repository/cat.repository';
import Cat from 'src/domain/entity/cat.entity';

@Injectable()
export default class CatTypeormRepository implements ICatRepository {
  constructor(
    @InjectRepository(TypeOrmCat)
    private catRepository: Repository<TypeOrmCat>,
  ) {}

  public async create(cat: Cat) {
    const createdCat = this.catRepository.create({
      id: cat.getId(),
      name: cat.getName(),
      age: cat.getAge(),
      breed: cat.getBreed(),
    });

    await this.catRepository.save(createdCat);
  }

  public async getOne(name: string) {
    const cat = await this.catRepository.findOne({ name });

    if (!!!cat) return null;

    return new Cat(cat.id, cat.name, cat.age, cat.breed);
  }

  public async getAll() {
    const cats = await this.catRepository.find();

    return cats.map((cat) => new Cat(cat.id, cat.name, cat.age, cat.breed));
  }
}
