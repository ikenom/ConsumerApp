import * as authClient from '../api/auth_client'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';
export default class AuthStore {

  private static instance: AuthStore;

  private userId: string | undefined;


  static init = async () => {
    const authStore = AuthStore.getInstance();
    await authStore.loginAsync("russ_okon@mills.org", "password")
  }

  static getInstance(): AuthStore {
    if (!AuthStore.instance) {
      AuthStore.instance = new AuthStore();
    }

    return AuthStore.instance;
  }

  loginAsync = async (email: String, password: String) => {
    try {
      const data = await authClient.login(email, password)
      await this.saveToken(data.login.token)
      this.userId = data.login.userId
      console.log("Successfully logged in")
    }
    catch(e){
      Alert.alert("Failed to login")
    }
  }

  saveToken = async (token: string) => {
    await AsyncStorage.setItem("token", token);
  }

  static getToken = async (): Promise<String | null> => {
    return AsyncStorage.getItem("token")
  }

  getUserId = () => {
    return this.userId
  }
}