import { ApiProperty } from '@nestjs/swagger';

export class CreatePlaceDto {
  @ApiProperty()
  public title: string;

  @ApiProperty()
  public desc: string;

  @ApiProperty()
  public adress: string;
}

//TODO: add class-validator
