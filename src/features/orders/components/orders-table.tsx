import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ArrowUpDown, Search } from "lucide-react";
import { useMemo, useState } from "react";

import type { Order } from "../types";

type SortField = "orderDate" | "customerName" | "totalPrice";
type SortDirection = "asc" | "desc";

export function OrdersTable({ orders }: { orders: Order[] }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortField, setSortField] = useState<SortField>("orderDate");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");

  // Filter and sort orders
  const filteredAndSortedOrders = useMemo(() => {
    let filtered = orders;

    if (searchQuery) {
      filtered = filtered.filter((order) => {
        const query = searchQuery.toLowerCase();
        return (
          order.id.toLowerCase().includes(query) ||
          order.customerName.toLowerCase().includes(query) ||
          order.email.toLowerCase().includes(query) ||
          order.address.toLowerCase().includes(query)
        );
      });
    }

    // Sort orders
    filtered.sort((a, b) => {
      let aValue = a[sortField];
      let bValue = b[sortField];

      if (sortField === "orderDate") {
        aValue = new Date(aValue).getTime();
        bValue = new Date(bValue).getTime();
      }

      if (sortField === "totalPrice") {
        aValue = Number(aValue);
        bValue = Number(bValue);
      }

      if (typeof aValue === "string" && typeof bValue === "string") {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }

      if (sortDirection === "asc") {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
      }
    });

    return filtered;
  }, [orders, searchQuery, sortField, sortDirection]);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  console.log(filteredAndSortedOrders);

  return (
    <div className="space-y-6">
      {/* Search and Controls */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search by order ID, customer name, email, or status..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => handleSort("orderDate")}
            className="flex items-center gap-2"
          >
            Date <ArrowUpDown className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            onClick={() => handleSort("totalPrice")}
            className="flex items-center gap-2"
          >
            Price <ArrowUpDown className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Orders Grid */}
      {filteredAndSortedOrders.length === 0 ? (
        <div className="text-center py-12">
          <h2 className="text-xl font-semibold mb-2">No orders found</h2>
          <p className="text-muted-foreground">
            {searchQuery
              ? "Try adjusting your search criteria."
              : "No orders have been placed yet."}
          </p>
        </div>
      ) : (
        <div className="grid gap-4">
          {filteredAndSortedOrders.map((order) => {
            return (
              <Card key={order.id}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{order.id}</CardTitle>
                    <div className="flex items-center gap-2"></div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <h4 className="font-medium mb-2">Customer Details</h4>
                      <p className="text-sm">
                        <strong>Name:</strong> {order.customerName}
                      </p>
                      <p className="text-sm">
                        <strong>Email:</strong> {order.email}
                      </p>
                      <p className="text-sm">
                        <strong>Address:</strong> {order.address}
                      </p>
                      <p className="text-sm">
                        <strong>Date:</strong>{" "}
                        {new Date(order.orderDate).toLocaleDateString()}
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">Order Items</h4>
                      <div className="space-y-1">
                        {order.items.map((item, index) => (
                          <div
                            key={index}
                            className="text-sm flex justify-between"
                          >
                            <span>
                              {item.name} ({item.size}) × {item.quantity}
                            </span>
                            <span>
                              ${(item.price * item.quantity).toFixed(2)}
                            </span>
                          </div>
                        ))}
                      </div>
                      <div className="mt-2 pt-2 border-t">
                        <div className="flex justify-between font-medium">
                          <span>Total:</span>
                          <span>${order.totalPrice.toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
