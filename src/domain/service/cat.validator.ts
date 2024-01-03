import ICatRepository from 'src/domain/repository/cat.repository';

export default class CatValidator {
  constructor(private readonly catRepository: ICatRepository) {}

  // test 필요
  async isNameExist(name: string): Promise<boolean> {
    console.log('aaaaaaaaaaaaa');
    console.log(await this.catRepository.getOne(name));
    console.log('aaaaaaaaaaaaaaaaaaa');
    return !Object.is(await this.catRepository.getOne(name), null);
  }
}
