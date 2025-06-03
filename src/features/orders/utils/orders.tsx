import supabase from "../../../utils/supabase";
import type { Order } from "../types";

export async function saveOrder(orderData: Omit<Order, "id" | "orderDate">) {
  try {
    const order: Omit<Order, "id"> = {
      ...orderData,
      orderDate: new Date().toISOString(),
    };

    // Save order to Supabase
    const { error, data } = await supabase
      .from("orders")
      .insert({
        address: order.address,
        customer_name: order.customerName,
        email: order.email,
        items: order.items,
        order_date: order.orderDate,
        total_price: order.totalPrice,
      })
      .select();

    if (error) throw error;

    return { success: true, orderId: data[0].id };
  } catch (error) {
    console.error("Error saving order:", error);
    return { success: false, error: "Failed to save order" };
  }
}

export async function getOrders(): Promise<Order[]> {
  try {
    const { data, error } = await supabase
      .from("orders")
      .select("*")
      .order("order_date", { ascending: false });

    if (error) throw error;

    return data.map((order) => ({
      id: order.id,
      address: order.address || "",
      customerName: order.customer_name || "",
      email: order.email || "",
      items:
        (order.items as Array<{
          id: string;
          name: string;
          price: number;
          quantity: number;
          size: string;
          weight: string;
        }>) || [],
      totalPrice: order.total_price || 0,
      orderDate: order.order_date || "",
    }));
  } catch (error) {
    console.error("Error reading orders:", error);
    return [];
  }
}
