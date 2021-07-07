import { createState, State } from "@hookstate/core";
import { createDraftOrder } from "../api/order_client";
import { Meal } from "../models/meal/meal";
import { DraftOrder } from "../models/order/order";
import AuthStore from "./authStore";
import Toast from 'react-native-simple-toast';


export default class OrderStore {
  private static instance: OrderStore

  private _cart: State<DraftOrder | undefined>

  private _isCreatingCart: State<Boolean>;

  static init = async () => {
    OrderStore.getInstance()
  }

  static getInstance(): OrderStore {
    if (!OrderStore.instance) {
      OrderStore.instance = new OrderStore();
    }

    return OrderStore.instance;
  }

  private constructor() {
    this._cart = createState<DraftOrder | undefined>(undefined)
    this._isCreatingCart = createState<Boolean>(false)
  }

  createCart = async (meals: Meal[]) => {
    const userId = await AuthStore.getInstance().getUserId();
    if (userId === undefined) {
      Toast.show('Something went wrong creating cart', Toast.LONG)
      console.log('User Id missing. Not creating cart')
      return
    }

    
    this._isCreatingCart.set(true)
    const result = await createDraftOrder(userId!, meals)

    if (result && result.createDraftOrder && result.createDraftOrder.succeeded) {
      this._cart.set({id: result.createDraftOrder.draftOrderId, meals})
    }

    this._isCreatingCart.set(false)
  }

  get isCreatingCart() {
    return this._isCreatingCart
  }

  get cart() {
    return this._cart
  }
}