import { Inject, Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

import Cat from 'src/domain/entity/cat.entity';
import ICatRepository from 'src/domain/repository/cat.repository';
import { CreateCatDto } from './cat.dto';

@Injectable()
export class CatService {
  constructor(
    @Inject('CAT_REPOSITORY')
    private readonly catRepository: ICatRepository,
  ) {}

  createCat(cat: CreateCatDto) {
    const newCat = new Cat(uuidv4(), cat.name, cat.age, cat.breed);
    return this.catRepository.create(newCat);
  }

  getCat(name: string) {
    return this.catRepository.getOne(name);
  }

  getCats() {
    return this.catRepository.getAll();
  }
}
