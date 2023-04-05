import { ApiProperty, PickType } from '@nestjs/swagger';
import { Cat } from '../cats.schema';

export class ReadOnlyCatDto extends PickType(Cat, ['email', 'name'] as const) {
  @ApiProperty({
    example: '642a636c22e14646e2b8bf8b',
    description: 'mongo db id',
    required: true,
  })
  id: string;
}
