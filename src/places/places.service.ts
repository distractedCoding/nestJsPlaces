import { Injectable, NotFoundException } from "@nestjs/common";
import { v4 as uuid } from 'uuid';

import { Place } from './place.model'

@Injectable()
export class PlacesService {
  private places: Place[] = [];

  insertPlaces(title: string, desc: string, adress: string) {
    const placeId: string = uuid()
    const newPlace = new Place(placeId , title, desc, adress)
    this.places.push(newPlace);
    return placeId;
  }

  getPlaces() {
    return [...this.places];
  }

  getSinglePlace(placeId: string) {
    const place = this.findPlace(placeId)[0]
    return {...place};
  }

  updatePlace(placeId: string, title: string, desc: string, adress: string) {
    const [place, index] = this.findPlace(placeId)
    const updatedPlace = {... place};
    if(title){
      updatedPlace.title = title;
    }
    if(desc){
      updatedPlace.desc = desc;
    }
    if(adress){
      updatedPlace.adress = adress;
    }
    this.places[index] = updatedPlace;
  }

  deletePlace(placeId: string) {
    const index = this.findPlace(placeId)[1];
    this.places.splice(index, 1)
  }

  private findPlace( id: string): [Place, number]{
    const placeIndex = this.places.findIndex((place) => place.id === id);
    const place = this.places[placeIndex];
    if (!place) {
      throw new NotFoundException('Could not find Place');
    }
    return [place, placeIndex];
  }
}
