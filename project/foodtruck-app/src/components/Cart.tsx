// src/components/Cart.tsx
import React from "react";
import CartItem from "./CartItem";
import { useCart } from "../context/CartContext";
import { useRouter } from "next/navigation";
import { createOrder } from "../utils/api";
import "../styles/cart.css";

const Cart: React.FC = () => {
  const { cartItems, addToCart, removeFromCart } = useCart();
  const router = useRouter();

  const totalAmount = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handleCheckout = async () => {
    // Förbereder orderdata för att skicka till API
    const orderBody = {
      items: cartItems.map((item) => item.id), // Skickar endast ID:n för varje item
    };

    console.log("Skickar order:", orderBody);

    try {
      const order = await createOrder(orderBody); // Skickar förfrågan och får tillbaka ordern
      console.log("Order skapad:", order);

      // Kollar om ordern innehåller ett giltigt order-ID
      if (order && order.id) {
        console.log(
          "Navigerar till preparing-order-sidan med orderId:",
          order.id
        );
        router.push(`/preparing-order?orderId=${order.id}`); // Navigerar till orderstatus-sidan
      } else {
        console.error("Order creation failed: No order ID returned");
      }
    } catch (error) {
      console.error("Failed to create order:", error);
    }
  };

  return (
    <div className="cart">
      <div className="cart-items">
        {cartItems.map((item) => (
          <CartItem
            key={item.id}
            name={item.name}
            price={item.price}
            quantity={item.quantity}
            onAdd={() => addToCart({ ...item, quantity: 1 })}
            onRemove={() => removeFromCart(item.id)}
          />
        ))}
      </div>
      <div className="cart-total">
        <div className="total-info">
          <span>
            TOTALT <br />
            inkl 20% moms
          </span>
          <strong>{totalAmount} SEK</strong>
        </div>
        <button className="checkout-button" onClick={handleCheckout}>
          TAKE MY MONEY!
        </button>
      </div>
    </div>
  );
};

export default Cart;
