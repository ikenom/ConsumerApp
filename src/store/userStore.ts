import { Meal } from '../models/meal/meal';

export default class UserStore {

  private static instance: UserStore

  static init = async () => {
    UserStore.getInstance()
  }

  static getInstance(): UserStore {
    if (!UserStore.instance) {
      UserStore.instance = new UserStore();
    }

    return UserStore.instance;
  }

  private constructor() { }

  // PLACEHOLDER
  isFlaggedIngredient = (meal: Meal): boolean => {
    // TODO Actually check ingredients
    return false // All not flagged for now
  }

  // PLACEHOLDER
  getLocation = (): string => {
    // TODO Actually return location
    return "Harlem"
  }

}