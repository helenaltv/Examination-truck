import { Wonton } from "./Wonton";
import { Dip } from "./Dip";
import { Drink } from "./Drink";

export type MenuItem = Wonton | Dip | Drink;

export interface Order {
  id: string;
  items: MenuItem[];
  orderValue: number;
  eta: string;
  timestamp: string;
  state: "pending" | "preparing" | "ready";
}
