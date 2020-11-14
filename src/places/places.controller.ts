import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { PlacesService } from './places.service';
import { CreatePlaceDto } from './dtos/creat-place.dto';
import { PatchPlaceDto } from './dtos/patch-place.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('places')
@Controller('places')
export class PlacesController {
  constructor(private placesService: PlacesService) {}

  @Post()
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  addPlace(@Body() createPlace: CreatePlaceDto) {
    const generatedId = this.placesService.insertPlace(createPlace);
    return { id: generatedId };
  }

  @Get()
  getAllPlaces() {
    return this.placesService.getPlaces();
  }

  @Get(':id')
  getPlace(@Param('id') placeId: string) {
    return this.placesService.getSinglePlace(placeId);
  }

  @Patch(':id')
  updatePlace(
    @Param('id') placeId: string,
    @Body() patchPlaceDto: PatchPlaceDto,
  ) {
    this.placesService.updatePlace(placeId, patchPlaceDto);
    return null;
  }

  @Delete(':id')
  removePlace(@Param('id') placeId: string) {
    this.placesService.deletePlace(placeId);
    return null;
  }
}
