export default class Cat {
  constructor(id: string, name: string, age: number, breed: string) {
    this.id = id;
    this.name = name;
    this.age = age;
    this.breed = breed;
  }

  // entity의 인스턴스는 각자의 고유값이 존재해야 함
  // db의 row는 하나의 entity로써의 역할을 할 수 있어야
  private id: string;

  private name: string;

  private age: number;

  private breed: string;

  public getId() {
    return this.id;
  }

  public getName() {
    return this.name;
  }

  public getAge() {
    return this.age;
  }

  public getBreed() {
    return this.breed;
  }
}

// entity의 역할 : 로직을 관리.
