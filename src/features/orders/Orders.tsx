import { useEffect, useState } from "react";
import { OrdersTable } from "./components/orders-table";
import { getOrders } from "./utils/orders";
import type { Order } from "./types";

export default function Orders() {
  const [orders, setOrders] = useState<Order[]>([]);

  console.log(orders);

  useEffect(() => {
    getOrders().then((orders) => {
      setOrders(orders);
    });
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Order Management</h1>
        <div className="text-sm text-muted-foreground">
          Total Orders: {orders.length}
        </div>
      </div>

      <OrdersTable orders={orders} />
    </div>
  );
}
