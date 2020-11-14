import { ApiProperty } from '@nestjs/swagger';

export class PatchPlaceDto {
  @ApiProperty({
    description: 'Name of the Place',
  })
  public title: string;

  @ApiProperty()
  public desc: string;

  @ApiProperty()
  public adress: string;
}

//TODO: add class-validator
