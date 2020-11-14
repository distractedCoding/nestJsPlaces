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

@Controller('places')
export class PlacesController {
  constructor(private placesService: PlacesService) {}

  @Post()
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
