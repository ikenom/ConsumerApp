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

}