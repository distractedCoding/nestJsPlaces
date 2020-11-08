import { Controller, Post, Body, Get, Param, Patch, Delete } from "@nestjs/common";
import { PlacesService } from './places.service'

@Controller('places')
export class PlacesController {
  constructor(private placesService: PlacesService) { }

  @Post()
  addPlace(
    @Body('title') placeTitle: string,
    @Body('description') placeDesc: string,
    @Body('adress') placeAdress: string,
  ) {
    const generatedId = this.placesService.insertPlaces(
      placeTitle,
      placeDesc,
      placeAdress,
    );
    return { id: generatedId };
  }

  @Get()
  getAllPlaces() {
    return this.placesService.getPlaces();
  }

  @Get(':id')
  getPlace(@Param('id') placeId: string, ) {
    return this.placesService.getSinglePlace(placeId);
  }

  @Patch(':id')
  updatePlace(
    @Param('id') placeId: string,
    @Body('title') placeTitle: string,
    @Body('description') placeDesc: string,
    @Body('adress') placeAdress: string,
  ) {
    this.placesService.updatePlace(placeId, placeTitle, placeDesc, placeAdress);
    return null;
  }

  @Delete(':id')
  removePlace(@Param('id') placeId: string,) {
    this.placesService.deletePlace(placeId);
    return null;
  }
}