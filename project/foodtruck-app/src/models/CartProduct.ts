// src/models/CartProduct.ts
export interface CartProduct {
  id: string; // Produktens unika ID
  name: string; // Produktens namn
  price: number; // Produktens pris
  quantity: number; // Antal av produkten i varukorgen
  type?: string; // Valfritt: Typ av produkt (t.ex. "wonton", "dip")
  description?: string; // Valfritt: Beskrivning av produkten
}
