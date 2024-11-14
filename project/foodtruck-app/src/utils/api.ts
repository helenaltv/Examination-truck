// src/utils/api.ts
import { MenuItem } from "../models/MenuItem";
import { Order } from "../models/Order";

const API_BASE_URL = "https://fdnzawlcf6.execute-api.eu-north-1.amazonaws.com";
const API_KEY_HEADER = "helenaadelsten";

/**
 * Hämtar menyobjekt baserat på typ (wonton, dip eller drink).
 */
export const fetchMenuItems = async (
  type: "wonton" | "dip" | "drink"
): Promise<MenuItem[]> => {
  const response = await fetch(`${API_BASE_URL}/menu?type=${type}`, {
    headers: {
      accept: "application/json",
      "x-zocom": API_KEY_HEADER,
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch ${type} items: ${response.statusText}`);
  }

  const data = await response.json();
  return data.items as MenuItem[];
};

/**
 * Skapa en ny beställning.
 * @param orderBody - Ett objekt som innehåller en array av items med deras ID:n.
 * @param tenant - Tenant-namnet för att specificera endpointen.
 */
// src/utils/api.ts
export const createOrder = async (
  orderBody: { items: number[] },
  tenant = "defaultTenant"
) => {
  const url = `${API_BASE_URL}/${tenant}/orders`;
  console.log("Skickar förfrågan till URL:", url);
  console.log("Payload som skickas:", JSON.stringify(orderBody));

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-zocom": API_KEY_HEADER,
    },
    body: JSON.stringify(orderBody),
  });

  if (!response.ok) {
    const errorMessage = `Failed to create order: ${response.status} ${response.statusText}`;
    console.error(errorMessage);
    throw new Error(errorMessage);
  }

  const data = await response.json();
  console.log("Order skapad:", data);
  return data.order as Order;
};

/**
 * Hämta status för en specifik beställning.
 * @param orderId - ID för beställningen.
 * @param tenant - Tenant-namnet för att specificera endpointen.
 */
// src/utils/api.ts
export const fetchOrderStatus = async (
  orderId: string,
  tenant = "defaultTenant"
): Promise<Order> => {
  const url = `${API_BASE_URL}/${tenant}/orders/${orderId}`;
  console.log("Hämtar orderstatus från URL:", url);

  const response = await fetch(url, {
    headers: {
      accept: "application/json",
      "x-zocom": API_KEY_HEADER,
    },
  });

  if (!response.ok) {
    const errorMessage = `Failed to fetch order status: ${response.status} ${response.statusText}`;
    console.error(errorMessage);
    throw new Error(errorMessage); // Se till att fel kastas om något går fel
  }

  const data = await response.json();
  console.log("Orderstatus mottagen:", data);
  return data as Order;
};
