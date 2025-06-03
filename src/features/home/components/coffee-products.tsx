import { CoffeeIcon, Search } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

import coffeeBag from "../../../assets/coffee-bag.png";
import type { Coffee } from "../types";
import { SizeSelectionModal } from "./size-selection-modal";

// Coffee product data
const coffeeProducts = [
  {
    id: 1,
    name: "Ethiopian Yirgacheffe",
    description:
      "Bright and fruity with notes of citrus and berries. Medium roast.",
    price: 14.99,
    image: coffeeBag,
  },
  {
    id: 2,
    name: "Colombian Supremo",
    description:
      "Well-balanced with caramel sweetness and nutty undertones. Medium-dark roast.",
    price: 13.99,
    image: coffeeBag,
  },
  {
    id: 3,
    name: "Sumatra Mandheling",
    description:
      "Earthy and full-bodied with low acidity and notes of chocolate. Dark roast.",
    price: 15.99,
    image: coffeeBag,
  },
  {
    id: 4,
    name: "Costa Rican Tarrazu",
    description:
      "Clean and crisp with hints of honey and orange. Light-medium roast.",
    price: 16.99,
    image: coffeeBag,
  },
  {
    id: 5,
    name: "Guatemalan Antigua",
    description: "Smooth with chocolate notes and subtle spice. Medium roast.",
    price: 14.49,
    image: coffeeBag,
  },
  {
    id: 6,
    name: "Kenya AA",
    description:
      "Bold and vibrant with wine-like acidity and blackcurrant notes. Medium roast.",
    price: 17.99,
    image: coffeeBag,
  },
];

export function CoffeeProducts() {
  const [selectedCoffee, setSelectedCoffee] = useState<Coffee>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSelectCoffee = (coffee: Coffee) => {
    setSelectedCoffee(coffee);
    setIsModalOpen(true);
  };

  // Filter coffee products based on search query
  const filteredCoffeeProducts = coffeeProducts.filter((coffee) => {
    const query = searchQuery.toLowerCase();
    return (
      coffee.name.toLowerCase().includes(query) ||
      coffee.description.toLowerCase().includes(query)
    );
  });

  return (
    <>
      {/* Add search input */}
      <div className="mb-8">
        <div className="relative max-w-md mx-auto">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search coffee by name or flavor notes..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Display message when no results found */}
      {filteredCoffeeProducts.length === 0 && (
        <div className="text-center py-12">
          <h2 className="text-xl font-semibold mb-2">No coffee found</h2>
          <p className="text-muted-foreground">
            Try adjusting your search or browse our full collection.
          </p>
          <Button
            variant="outline"
            className="mt-4"
            onClick={() => setSearchQuery("")}
          >
            Clear search
          </Button>
        </div>
      )}

      {/* Display filtered coffee products */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCoffeeProducts.map((coffee) => (
          <Card
            key={coffee.id}
            id={`coffee-${coffee.id}`}
            className="overflow-hidden transition-all duration-300"
          >
            <div className="relative h-48 bg-muted">
              <img
                src={coffee.image || "/placeholder.svg"}
                alt={coffee.name}
                className="object-cover w-full h-full"
              />
            </div>
            <CardHeader>
              <CardTitle>{coffee.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{coffee.description}</p>
              <p className="mt-4 text-lg font-semibold">
                ${coffee.price.toFixed(2)}
              </p>
            </CardContent>
            <CardFooter>
              <Button
                className="w-full"
                onClick={() => handleSelectCoffee(coffee)}
              >
                <CoffeeIcon className="mr-2 h-4 w-4" /> Select Size
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {selectedCoffee && (
        <SizeSelectionModal
          coffee={selectedCoffee}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
}
