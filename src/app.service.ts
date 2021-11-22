import { Inject, Injectable } from '@nestjs/common';
import ICatRepository from './domain/repository/cat.repository';
import { Cat } from './domain/schema/cat.schema';

@Injectable()
export class AppService {
  constructor(
    @Inject('CAT_REPOSITORY')
    private readonly catRepository: ICatRepository,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  createCat(cat: Cat) {
    return this.catRepository.create(cat);
  }

  getCat(name: string) {
    return this.catRepository.getOne(name);
  }

  getCats() {
    return this.catRepository.getAll();
  }
}
