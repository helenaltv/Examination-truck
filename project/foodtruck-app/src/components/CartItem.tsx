// src/components/CartItem.tsx
import React from "react";
import "../styles/cartitem.css";

interface CartItemProps {
  name: string;
  price: number;
  quantity: number;
  onAdd: () => void;
  onRemove: () => void;
}

const CartItem: React.FC<CartItemProps> = ({
  name,
  price,
  quantity,
  onAdd,
  onRemove,
}) => {
  return (
    <div className="cart-item">
      <div className="item-details">
        <h4>{name.toUpperCase()}</h4>
        <span className="price">{price} SEK</span>
      </div>
      <div className="item-controls">
        <button className="control-button" onClick={onAdd}>
          +
        </button>
        <span>{quantity} stycken</span>
        <button className="control-button" onClick={onRemove}>
          −
        </button>
      </div>
    </div>
  );
};

export default CartItem;
