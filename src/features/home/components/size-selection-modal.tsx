import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { CoffeeIcon } from "lucide-react";

import type { Coffee } from "../types";
import { useCart } from "../../cart/hooks/useCart";

const sizes = [
  { id: "small", name: "Small", weight: "250g", priceModifier: 0 },
  { id: "medium", name: "Medium", weight: "500g", priceModifier: 8 },
  { id: "large", name: "Large", weight: "1kg", priceModifier: 15 },
];

export function SizeSelectionModal({
  coffee,
  isOpen,
  onClose,
}: {
  coffee: Coffee;
  isOpen: boolean;
  onClose: () => void;
}) {
  const [selectedSize, setSelectedSize] = useState("medium");
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    const size = sizes.find((s) => s.id === selectedSize);

    if (!size) return;

    const totalPrice = Number(coffee.price) + size.priceModifier;

    addToCart({
      id: `${coffee.id}-${selectedSize}`,
      coffeeId: coffee.id,
      name: coffee.name,
      size: size.name,
      weight: size.weight,
      price: totalPrice,
      image: coffee.image,
    });

    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Select Package Size</DialogTitle>
          <DialogDescription>
            Choose your preferred size for {coffee.name}
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <RadioGroup
            value={selectedSize}
            onValueChange={setSelectedSize}
            className="gap-6"
          >
            {sizes.map((size) => {
              const totalPrice = (
                Number(coffee.price) + size.priceModifier
              ).toFixed(2);

              return (
                <div key={size.id} className="flex items-center space-x-2">
                  <RadioGroupItem value={size.id} id={size.id} />
                  <Label
                    htmlFor={size.id}
                    className="flex flex-1 justify-between"
                  >
                    <span>
                      {size.name} ({size.weight})
                    </span>
                    <span className="font-semibold">${totalPrice}</span>
                  </Label>
                </div>
              );
            })}
          </RadioGroup>
        </div>
        <DialogFooter>
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="button" onClick={handleAddToCart}>
            <CoffeeIcon className="mr-2 h-4 w-4" /> Add to Cart
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
