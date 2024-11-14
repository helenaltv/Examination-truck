// src/app/page.tsx
"use client";

import React, { useEffect, useState } from "react";
import MenuItemCard from "../components/MenuItemCard";
import { fetchMenuItems } from "../utils/api";
import { MenuItem } from "../models/MenuItem";
import { useCart } from "../context/CartContext";

const Page: React.FC = () => {
  const [wontons, setWontons] = useState<MenuItem[]>([]);
  const [dips, setDips] = useState<MenuItem[]>([]);
  const [drinks, setDrinks] = useState<MenuItem[]>([]);
  const [error, setError] = useState<string | null>(null);

  const { addToCart, cartItems } = useCart();

  // Funktion för att kontrollera om en produkt redan finns i varukorgen
  const isSelected = (id: string) =>
    cartItems.some((cartItem) => cartItem.id === id);

  // Hämta menyalternativ från API
  useEffect(() => {
    const loadData = async () => {
      try {
        const wontonItems = await fetchMenuItems("wonton");
        const dipItems = await fetchMenuItems("dip");
        const drinkItems = await fetchMenuItems("drink");

        setWontons(wontonItems);
        setDips(dipItems);
        setDrinks(drinkItems);
      } catch (err) {
        setError("Failed to load menu items.");
        console.error(err);
      }
    };

    loadData();
  }, []);

  // Hantera val av menyalternativ och lägg till i varukorgen
  const handleSelectItem = (item: MenuItem) => {
    addToCart({ ...item, id: String(item.id), quantity: 1 });
  };

  return (
    <div className="menu-page">
      <header className="cart-header">
        <h2>MENY</h2>
      </header>

      {error && <p className="error-message">{error}</p>}

      <section className="wonton-section">
        <h3>Wontons</h3>
        {wontons.map((item) => (
          <MenuItemCard
            key={item.id}
            item={item}
            onSelect={handleSelectItem}
            isSelected={isSelected(String(item.id))}
          />
        ))}
      </section>

      <section className="dip-section">
        <h3>DIPSÅS</h3>
        <div className="options-grid">
          {dips.map((item) => (
            <div
              key={item.id}
              className={`option-button ${
                isSelected(String(item.id)) ? "active" : ""
              }`}
              onClick={() => handleSelectItem(item)}
            >
              {item.name}
            </div>
          ))}
        </div>
      </section>

      <section className="drink-section">
        <h3>DRICKA</h3>
        <div className="options-grid">
          {drinks.map((item) => (
            <div
              key={item.id}
              className={`option-button ${
                isSelected(String(item.id)) ? "active" : ""
              }`}
              onClick={() => handleSelectItem(item)}
            >
              {item.name}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Page;
