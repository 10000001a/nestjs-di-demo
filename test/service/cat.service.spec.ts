import { CreateCatDto } from 'src/service/cat.dto';
import Cat from 'src/domain/entity/cat.entity';
import ICatRepository from 'src/domain/repository/cat.repository';
import { CatService } from 'src/service/cat.service';

describe('CatService', () => {
  let mockCatRepository;
  let catService;

  beforeEach(() => {
    // 익명 클래스
    // test 코드에서는 db에 영향을 주면 안되기 때문에 일시적으로 db 역할을 해준다.
    mockCatRepository = new (class implements ICatRepository {
      cats = [];

      setCats(cats: Cat[]) {
        this.cats = cats;
      }

      create(cat: Cat): Promise<void> {
        this.cats.push(cat);
        return Promise.resolve(null);
      }
      getOne(name: string): Promise<Cat> {
        return Promise.resolve(this.cats.find((cat) => cat.name === name));
      }
      getAll(): Promise<Cat[]> {
        return Promise.resolve(this.cats);
      }
    })();
    catService = new CatService(mockCatRepository);
  });

  describe('createCat', () => {
    it('should create a cat with mocked repository', async () => {
      // Given : CreateCatDto의 인스턴스 newCatDto가 주어진다.
      const newCatDto: CreateCatDto = { name: 'one', age: 1, breed: 'breed' };

      // When : CatService의 createCat 메서드가 매개변수로 newCatDto를 받아 실행된다.
      await catService.createCat(newCatDto);

      // Then : DB에 저장된 Cat은 1개이고, 그 Cat은 newCatDto와 name, age, breed가 일치한다.
      const cats = await catService.getCats();
      expect(cats.length).toBe(1);

      const cat = await catService.getCat(newCatDto.name);
      expect(cat.age).toBe(newCatDto.age);
      expect(cat.breed).toBe(newCatDto.breed);
    });
  });

  describe('getOne', () => {
    it('should return a cat (self mocking ver.)', async () => {
      // Given : DB에 하나의 Cat이 주어진다.
      const result = new Cat('1', 'one', 1, 'breed');
      mockCatRepository.setCats([result]);

      // When : 주어진 Cat의 name으로 CatService의 getCat 메서드를 실행한다.
      const cat = await catService.getCat('one');

      // Then : getCat의 반환값이 주어진 Cat과 일치한다.
      expect(cat).toBe(result);
    });

    it('should return a cat (jest mocking ver.)', async () => {
      // Given : DB에 하나의 Cat이 주어진다.
      const result = new Cat('1', 'one', 1, 'breed');
      jest
        .spyOn(mockCatRepository, 'getOne')
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        .mockImplementation((_: string) => result);

      // When : 주어진 Cat의 name으로 CatService의 getCat 메서드를 실행한다.
      const cat = await catService.getCat('one');

      // Then : getCat의 반환값이 주어진 Cat과 일치한다.
      expect(cat).toBe(result);
    });
  });

  describe('getAll', () => {
    it('should return an array of cats (self mocking ver.)', async () => {
      // Given : 배열에 2개의 Cat이 주어지고 이를 db에 넣어준다.
      const result = [
        new Cat('1', 'one', 1, 'breed'),
        new Cat('2', 'two', 1, 'breed'),
      ];
      mockCatRepository.setCats(result);

      // When : CatService의 getCats 메서드를 실행한다.
      const cats = await catService.getCats();

      // Then : 반환값이 주어진 Cat 배열과 일치한다.
      expect(cats).toBe(result);
    });

    it('should return an array of cats (jest mocking ver.)', async () => {
      // Given : 배열에 2개의 Cat이 주어지고 이를 db에 넣어준다.
      const result = [
        new Cat('1', 'one', 1, 'breed'),
        new Cat('2', 'two', 1, 'breed'),
      ];
      jest.spyOn(mockCatRepository, 'getAll').mockImplementation(() => result);

      // When : CatService의 getCats 메서드를 실행한다.
      const cats = await catService.getCats();

      // Then : 반환값이 주어진 Cat 배열과 일치한다.
      expect(cats).toBe(result);
    });
  });
});
