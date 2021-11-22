// import Cat from '../cat';
import { Cat, CatDocument } from '../schema/cat.schema';

export default interface ICatRepository {
  create: (cat: Cat) => Promise<void>;
  getOne: (name: string) => Promise<Cat>;
  getAll: () => Promise<Cat[]>;
}
