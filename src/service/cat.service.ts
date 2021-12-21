import { Inject, Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

import Cat from 'src/domain/entity/cat.entity';
import ICatRepository from 'src/domain/repository/cat.repository';
import CatValidator from 'src/domain/service/cat.validator';
import { CreateCatDto } from 'src/service/cat.dto';

@Injectable()
export class CatService {
  constructor(
    @Inject('CAT_REPOSITORY')
    private readonly catRepository: ICatRepository,
    private readonly catValidator: CatValidator,
  ) {
    this.catValidator = new CatValidator(this.catRepository);
  }

  async createCat(cat: CreateCatDto) {
    const newCat = await Cat.create(
      uuidv4(),
      cat.name,
      cat.age,
      cat.breed,
      this.catValidator,
    );
    return this.catRepository.create(newCat);
  }

  getCat(name: string) {
    return this.catRepository.getOne(name);
  }

  getCats() {
    return this.catRepository.getAll();
  }
}
