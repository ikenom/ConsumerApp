import { DateTime } from "luxon";

export interface Restaurant {
  name: string;
  description: string;
  image: any;
  businessHours: BusinessHours;
  location: Location;
}


export interface BusinessHours {
  openingTime: string;
  closingHourTime: string;
}

export interface Location {
  street: string;
  city: string;
  state: string;
  zip: string;
}