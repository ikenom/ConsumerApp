import { Meal } from "../meal/meal";

export interface Order {
  orderNumber: string,
  lineItems: Pick<Meal, "name" | "price">[]
}