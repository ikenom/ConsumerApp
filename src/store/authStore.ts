import * as authClient from '../api/auth_client'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';

export default class AuthStore {

  private static instance: AuthStore;

  static init = async () => {
    const authStore = AuthStore.getInstance();
    console.log("Starting call to backend")
    await authStore.loginAsync("bong.oconnell@spencer.org", "password")
  }

  static getInstance(): AuthStore {
    if (!AuthStore.instance) {
      AuthStore.instance = new AuthStore();
    }

    return AuthStore.instance;
  }

  loginAsync = async (email: String, password: String) => {
    const data = await authClient.login(email, password)
    this.saveToken(data.login.token)
    await authClient.test()
    Alert.alert("Done")
  }

  saveToken = (token: string) => {
    AsyncStorage.setItem("token", token);
  }

  getToken = async (): Promise<String | null> => {
    return AsyncStorage.getItem("token")
  }

}

export class MockUserStore extends AuthStore{
  init = async() => {}
}