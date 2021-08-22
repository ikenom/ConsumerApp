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

  isMealFlagged = (meal: Meal): boolean => {
    // TO DO Actually check ingredients
    return false
  }

}