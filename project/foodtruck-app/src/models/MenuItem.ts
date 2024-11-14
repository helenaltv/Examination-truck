export interface MenuItem {
  id: number;
  type: string; // e.g., "wonton", "dip", "drink"
  name: string;
  description: string;
  price: number;
  ingredients?: string[]; // Only available for Wonton items
}
