import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuid } from 'uuid';

import { Place } from './place.model';
import { CreatePlaceDto } from './dtos/creat-place.dto';
import { PatchPlaceDto } from './dtos/patch-place.dto';

@Injectable()
export class PlacesService {
  private places: Place[] = [];

  insertPlace(createpPlaceDto: CreatePlaceDto) {
    const placeId: string = uuid();
    const newPlace = new Place(
      placeId,
      createpPlaceDto.title,
      createpPlaceDto.desc,
      createpPlaceDto.adress,
    );
    this.places.push(newPlace);
    return placeId;
  }

  getPlaces() {
    return [...this.places];
  }

  getSinglePlace(placeId: string) {
    const place = this.findPlace(placeId)[0];
    return { ...place };
  }

  updatePlace(placeId: string, patchPlaceDto: PatchPlaceDto) {
    const [place, index] = this.findPlace(placeId);
    const updatedPlace = { ...place };
    if (patchPlaceDto.title) {
      updatedPlace.title = patchPlaceDto.title;
    }
    if (patchPlaceDto.desc) {
      updatedPlace.desc = patchPlaceDto.desc;
    }
    if (patchPlaceDto.adress) {
      updatedPlace.adress = patchPlaceDto.adress;
    }
    this.places[index] = updatedPlace;
  }
  //asdasd
  //TODO: test this
  // updatePlace(placeId: string, patchPlaceDto: PatchPlaceDto) {
  //   const [place, index] = this.findPlace(placeId)
  //   const updatedPlace = {... place};
  //   for(const pop in patchPlaceDto) {
  //     patchPlaceDto[pop] = updatedPlace[pop] ? updatedPlace[pop] :  patchPlaceDto[pop];
  //   }
  //   this.places[index] = updatedPlace;
  // }

  deletePlace(placeId: string) {
    const index = this.findPlace(placeId)[1];
    this.places.splice(index, 1);
  }

  private findPlace(id: string): [Place, number] {
    const placeIndex = this.places.findIndex((place) => place.id === id);
    const place = this.places[placeIndex];
    if (!place) {
      throw new NotFoundException('Could not find Place');
    }
    return [place, placeIndex];
  }
}
