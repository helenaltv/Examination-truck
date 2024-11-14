import { MenuItem } from "./MenuItem";

export interface Receipt {
  id: string;
  orderValue: number;
  timestamp: string;
  items: MenuItem[];
}
