import Cat from '../entity/cat.entity';

export default interface ICatRepository {
  create: (cat: Cat) => Promise<void>;
  getOne: (name: string) => Promise<Cat>;
  getAll: () => Promise<Cat[]>;
}
