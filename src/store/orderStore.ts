import { createState, State } from "@hookstate/core";
import { completeDraftOrder, createDraftOrder, getDraftOrder, subscribeToDraftOrderCompletion } from "../api/order_client";
import { Meal } from "../models/meal/meal";
import { DraftOrder, Order, OrderType } from "../models/order/order";
import AuthStore from "./authStore";
import Toast from 'react-native-simple-toast';
import { DateTime } from "luxon";


export default class OrderStore {
  private static instance: OrderStore

  private _cart: State<DraftOrder | undefined>
  private _orders: State<Order[]>

  private _isCreatingCart: State<boolean>;
  private _isCheckingOut: State<boolean>;

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
    this._isCreatingCart = createState<boolean>(false)
    this._isCheckingOut = createState<boolean>(false)
    this._orders = createState<Order[]>([])
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
      this._cart.set({id: result.createDraftOrder.draftOrder.id, meals})
      console.log(result.createDraftOrder.draftOrder.id)
    }

    this._isCreatingCart.set(false)
  }

  checkout = async (callback: () => any) => {
    const draftOrder = this._cart.get()

    if(draftOrder === undefined) {
      Toast.show('Unable to checkout because cart is empty', Toast.LONG)
      return
    }

    this._isCheckingOut.set(true)

    // Currently subscriptions don't work because the library we us only works in teh browser. Found a possible react-native solution
    // that should take a couple of hours to figure out: https://github.com/kesha-antonov/react-native-action-cable/issues/5
    // await this.subscribeToDraftOrderCompletion(onComplete) 

    await completeDraftOrder(draftOrder.id)


    const pollForOrder = async (attempts: number, maxAttempts: number, intervalInMs: number): Promise<Order | null> => {

        console.log("Polling for checkout completion")

        if (attempts === maxAttempts) {
          Toast.show('Failed to create order. Please try again.', Toast.LONG)
          return null;
        }

        try {
          const result = await getDraftOrder(draftOrder.id);

          if (result?.node?.order === null) {
            setTimeout(pollForOrder(attempts++, maxAttempts, intervalInMs), intervalInMs)
          }
  
          const order = result.node.order;
  
          return {
            id: order.id,
            orderNumber: order.orderNumber,
            lineItems: draftOrder.meals,
            subTotal: order.price,
            taxesAndFees: "2.00",
            customerName: order.customer.firstName + " " + order.customer.lastName,
            type: order.type as OrderType,
            fulfillmentDetails: {
              fulfillmentTime: DateTime.now().plus({minutes: order.timeRemaining ? order.timeRemaining : 25})
            }
          } as Order
        } catch(e) {
          console.log(JSON.stringify(e))
        }
        return null;
    }

    const order = await pollForOrder(0, 15, 300)

    if(order) {
      this.draftOrderCompleted(order)
      callback()
    }
  }

  subscribeToDraftOrderCompletion = async (callback: (order: Order) => any) => {
    await subscribeToDraftOrderCompletion(callback)
  }

  draftOrderCompleted = (order: Order) => {
    this._orders.set([order])
    this._isCheckingOut.set(false)
    Toast.show('Order submitted!', Toast.LONG)
  }

  get isCreatingCart() {
    return this._isCreatingCart
  }

  get isCheckingOut() {
    return this._isCheckingOut
  }

  get cart() {
    return this._cart
  }

  get order() {
    return this._orders[0]
  }
}