import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CatDocument = CatSchemaClass & Document;

@Schema()
export class CatSchemaClass {
  @Prop({ required: true })
  id: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  age: number;

  @Prop({ required: true })
  breed: string;
}

export const CatSchema = SchemaFactory.createForClass(CatSchemaClass);

// 이렇게도 사용 가능
// export const CatSchema = new mongoose.Schema({
//   name: String,
//   age: Number,
//   breed: String,
// });
