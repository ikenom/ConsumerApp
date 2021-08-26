import { DateTime } from "luxon";
import { Meal } from "../meal/meal";

export interface Restaurant {
  id: string;
  name: string;
  description: string;
  image?: any;
  businessHours: BusinessHours;
  location: Location;
  distance: string;
  phoneNumber: string;
  meals: Meal[]
}


export interface BusinessHours {
  openingTime: string;
  closingTime: string;
}

export interface Location {
  street: string;
  city: string;
  state: string;
  zipCode: string;
}