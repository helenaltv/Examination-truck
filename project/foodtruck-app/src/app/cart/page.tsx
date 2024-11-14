// src/app/cart/page.tsx eller src/pages/cart.tsx
"use client";

import React from "react";
import Cart from "../../components/Cart";

const CartPage: React.FC = () => {
  return (
    <div className="cart-page">
      <h2></h2>
      <Cart />
    </div>
  );
};

export default CartPage;
