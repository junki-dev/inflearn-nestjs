import { Comments } from './../comments/comments.schema';
import { ApiProperty } from '@nestjs/swagger';
import { Prop, Schema, SchemaFactory, SchemaOptions } from '@nestjs/mongoose';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { Document } from 'mongoose';

const options: SchemaOptions = {
  timestamps: true,
};

@Schema(options)
export class Cat extends Document {
  @ApiProperty({
    example: 'joa@gmail.com',
    description: 'email',
    required: true,
  })
  @Prop({ required: true, unique: true })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: 'joa',
    description: 'name',
    required: true,
  })
  @Prop({
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @Prop()
  @IsString()
  @IsNotEmpty()
  password: string;

  @Prop({
    default: `https://raw.githubusercontent.com/amamov/teaching-nestjs-a-to-z/main/images/1.jpeg`,
  })
  @IsString()
  imgUrl: string;

  readonly readOnlyData: {
    id: string;
    email: string;
    name: string;
    imgUrl: string;
  }; //* virtual readonly data

  readonly comments: Comments[];
}

const _CatSchema = SchemaFactory.createForClass(Cat);

//* password가 응답데이터로 보여지면 안되기 때문에 사용자에게만 보여지도록 virtual(readOnlyData) 처리할 수 있다.
_CatSchema.virtual('readOnlyData').get(function (this: Cat) {
  return {
    id: this.id,
    email: this.email,
    name: this.name,
    imgUrl: this.imgUrl,
    comments: this.comments,
  };
});

_CatSchema.virtual('commentList', {
  ref: 'comments',
  localField: '_id',
  foreignField: 'info',
});

_CatSchema.set('toObject', { virtuals: true });

_CatSchema.set('toJSON', { virtuals: true });

export const CatSchema = _CatSchema;
