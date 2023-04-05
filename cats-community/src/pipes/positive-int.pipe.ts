import { Injectable, PipeTransform, HttpException } from '@nestjs/common';

@Injectable()
export class PositiveIntPipe implements PipeTransform {
  transform(value: number) {
    if (value < 0) {
      throw new HttpException(
        'Value must be greater than or equal to zero',
        400,
      );
    }
    return value;
  }
}
