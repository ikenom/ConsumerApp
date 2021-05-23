import { DateTime } from "luxon";
import { Restaurant } from "./restaurant";

export const MOCK_RESTAURANT: Restaurant = {
  name: "Harlem Tavern",
  description: "New York City’s Neighborhood Bar, Restaurant & Beer Garden",
  image: require('../../../assets/testImages/HarlemTavern.png'),
  businessHours: {
    openingTime:  DateTime.fromISO('2020-08-06T11:00:00'),
    closingHourTime: DateTime.fromISO('2020-08-06T22:00:00'),
  },
  location: {
    state: "NY",
    zip: "10026",
    street: "2153 Fredrick Douglass Blvd",
    city: "New York"
  }
}