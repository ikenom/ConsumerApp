import { DateTime } from "luxon";
import { Meal } from "../meal/meal";

type OrderType = 'Pickup' | 'Delivery';

interface FulfillmentDetails {
  fulfillmentTime: DateTime;
};

interface PickUpFulfillment extends FulfillmentDetails {
}
export interface Order {
  orderNumber: string,
  lineItems: Pick<Meal, "name" | "price" | "nutrition">[],
  taxesAndFees: string,
  subTotal: string,
  customerName: string,
  type: OrderType,
  fulfillmentDetails: FulfillmentDetails,
  additionalNote?: string
}

export type LineItem = Pick<Meal, 'name' | 'price' | 'nutrition'>