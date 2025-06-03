export type CartItem = {
    id: string
    coffeeId: number
    name: string
    size: string
    weight: string
    price: number
    image: string
    quantity?: number
  }

export  type CartContextType = {
    items: CartItem[]
    addToCart: (item: CartItem) => void
    removeFromCart: (itemId: string) => void
    updateQuantity: (itemId: string, quantity: number) => void
    clearCart: () => void
    totalItems: number
    totalPrice: number
  } 