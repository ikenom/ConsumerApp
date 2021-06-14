import { DateTime } from "luxon";
import { Meal } from "../meal/meal";
import { MOCK_NUTRITION } from "../meal/util";
import { LineItem, Order } from "./order";

const MOCK_ORDER_LINE_ITEM = [{ price: "13.50", name: "Blackened Salmon Fillet", nutrition: MOCK_NUTRITION}];

const total = MOCK_ORDER_LINE_ITEM
  .map(lineItem => Number.parseFloat(lineItem.price))
  .reduce((total, lineItemPrice) => lineItemPrice + total);

const taxesAndFees = total * .15;

export const createMockOrderWithItems = (lineItems: LineItem[], additionalNote?: string): Order => {
  const subtotal = getSubTotal(lineItems);
  const taxesAndFees = total * .15;

  return {
    customerName: "Travis Davidson",
    lineItems: lineItems,
    subTotal: subtotal.toFixed(2),
    taxesAndFees: taxesAndFees.toFixed(2),
    orderNumber: Math.floor(Math.random() * 1000).toString(),
    type: "Pickup",
    fulfillmentDetails: {
      fulfillmentTime: DateTime.now().plus({minutes: 30})
    },
    additionalNote
  }
}

const getSubTotal = (lineItems: LineItem[]): number => {
  return lineItems
  .map(lineItem => Number.parseFloat(lineItem.price))
  .reduce((total, lineItemPrice) => lineItemPrice + total);
}

export const MOCK_ORDER: Order = {
  customerName: "Travis Davidson",
  lineItems: MOCK_ORDER_LINE_ITEM,
  subTotal: total.toFixed(2),
  taxesAndFees: taxesAndFees.toFixed(2),
  orderNumber: Math.floor(Math.random() * 1000).toString(),
  type: "Pickup",
  fulfillmentDetails: {
    fulfillmentTime: DateTime.now().plus({minutes: 30})
  },
  additionalNote: "Lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum",
}
