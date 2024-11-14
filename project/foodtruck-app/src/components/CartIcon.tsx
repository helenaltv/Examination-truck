"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useCart } from "../context/CartContext";
import "../styles/carticon.css";

const CartIcon: React.FC = () => {
  const { cartCount } = useCart();
  const router = useRouter();

  return (
    <div className="cart-div">
      <div className="cart-icon">
        <button onClick={() => router.push("/cart")}>
          <span role="img" aria-label="cart">
            🛒
          </span>
          {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
        </button>
      </div>
    </div>
  );
};

export default CartIcon;
