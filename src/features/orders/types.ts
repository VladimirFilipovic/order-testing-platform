export type Order = {
  id: string;
  customerName: string;
  email: string;
  address: string;
  items: Array<{
    id: string;
    name: string;
    size: string;
    weight: string;
    price: number;
    quantity: number;
  }>;
  totalPrice: number;
  orderDate: string;
};
