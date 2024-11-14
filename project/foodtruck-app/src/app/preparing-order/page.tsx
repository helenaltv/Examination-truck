// src/app/preparing-order/page.tsx
"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import boxtop from "/public/boxtop.png";
import { fetchOrderStatus } from "../../utils/api";
import { Order } from "../../models/Order";
import OrderStatus from "../../components/OrderStatus";
import "../../styles/preparing-order.css";

const PreparingOrderPage: React.FC = () => {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");
  const [order, setOrder] = useState<Order | null>(null);

  useEffect(() => {
    const getOrderStatus = async () => {
      if (!orderId) {
        console.error("Inget orderId tillhandahållet");
        return;
      }

      try {
        console.log("Anropar fetchOrderStatus med orderId:", orderId);
        const orderData = await fetchOrderStatus(orderId);
        setOrder(orderData);
      } catch (error) {
        console.error("Failed to fetch order status:", error);
      }
    };

    getOrderStatus();

    // Polling för att uppdatera status var 30 sekunder (valfritt)
    const interval = setInterval(getOrderStatus, 30000);
    return () => clearInterval(interval);
  }, [orderId]);

  if (!order) return <p>Laddar beställningsinformation...</p>;

  return (
    <div className="preparing-order-page">
      <Image
        src={boxtop}
        alt="Din beställning tillagas"
        width={200}
        height={200}
      />
      <OrderStatus order={order} />

      <div className="buttons">
        <Link href={`/receipt/${order.id}`}>
          <button className="view-receipt-button">SE KVITTO</button>
        </Link>
        <Link href="/">
          <button className="new-order-button">GÖR EN NY BESTÄLLNING</button>
        </Link>
      </div>
    </div>
  );
};

export default PreparingOrderPage;
