// src/components/OrderStatus.tsx
import React from "react";
import { Order } from "../models/Order";

interface OrderStatusProps {
  order: Order;
}

const OrderStatus: React.FC<OrderStatusProps> = ({ order }) => {
  return (
    <div className="order-status">
      <h2>DINA WONTONS TILLAGAS!</h2>
      <p>ETA: {order.eta} minuter</p>
      <p>Ordernummer: {order.id}</p>
      <p>Totalvärde: {order.orderValue} SEK</p>
    </div>
  );
};

export default OrderStatus;
