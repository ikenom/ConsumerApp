import { DateTime } from "luxon";

export interface Restaurant {
  name: string;
  description: string;
  image: any;
  businessHours: BusinessHours;
  location: Location;
}


interface BusinessHours {
  openingTime: DateTime;
  closingHourTime: DateTime;
}

interface Location {
  street: string;
  city: string;
  state: string;
  zip: string;
}