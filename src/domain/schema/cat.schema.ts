import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CatDocument = Cat & Document;

@Schema()
export class Cat {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  age: number;

  @Prop({ required: true })
  breed: string;
}

export const CatSchema = SchemaFactory.createForClass(Cat);

// 이렇게도 사용 가능
// export const CatSchema = new mongoose.Schema({
//   name: String,
//   age: Number,
//   breed: String,
// });
