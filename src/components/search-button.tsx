import { Search } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { useNavigate } from "react-router-dom"

// Import the coffee products data
const coffeeProducts = [
  {
    id: 1,
    name: "Ethiopian Yirgacheffe",
    description: "Bright and fruity with notes of citrus and berries. Medium roast.",
    price: 14.99,
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 2,
    name: "Colombian Supremo",
    description: "Well-balanced with caramel sweetness and nutty undertones. Medium-dark roast.",
    price: 13.99,
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 3,
    name: "Sumatra Mandheling",
    description: "Earthy and full-bodied with low acidity and notes of chocolate. Dark roast.",
    price: 15.99,
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 4,
    name: "Costa Rican Tarrazu",
    description: "Clean and crisp with hints of honey and orange. Light-medium roast.",
    price: 16.99,
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 5,
    name: "Guatemalan Antigua",
    description: "Smooth with chocolate notes and subtle spice. Medium roast.",
    price: 14.49,
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 6,
    name: "Kenya AA",
    description: "Bold and vibrant with wine-like acidity and blackcurrant notes. Medium roast.",
    price: 17.99,
    image: "/placeholder.svg?height=200&width=200",
  },
]

export function SearchButton() {
  const [searchQuery, setSearchQuery] = useState("")
  const [isOpen, setIsOpen] = useState(false)
  const navigate = useNavigate() 

  // Filter coffee products based on search query
  const filteredCoffeeProducts = coffeeProducts.filter((coffee) => {
    const query = searchQuery.toLowerCase()
    return coffee.name.toLowerCase().includes(query) || coffee.description.toLowerCase().includes(query)
  })

  const handleProductClick = (coffeeId: number) => {
    setIsOpen(false)
    // In a real app, you might want to navigate to a product detail page
    // For now, we'll just scroll to the products section
    navigate('/')
    setTimeout(() => {
      // Highlight the selected product (in a real app)
      // This is a simple implementation - you might want to enhance this
      const element = document.getElementById(`coffee-${coffeeId}`)
      if (element) {
        element.scrollIntoView({ behavior: "smooth" })
        element.classList.add("ring-2", "ring-primary")
        setTimeout(() => {
          element.classList.remove("ring-2", "ring-primary")
        }, 2000)
      }
    }, 100)
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <Search className="h-5 w-5" />
          <span className="sr-only">Search</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Search Coffee</DialogTitle>
        </DialogHeader>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search by name, flavor notes, or roast..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            autoFocus
          />
        </div>
        <div className="mt-4 max-h-[300px] overflow-y-auto">
          {searchQuery.length > 0 && filteredCoffeeProducts.length === 0 && (
            <p className="text-center py-4 text-muted-foreground">No coffee found matching your search</p>
          )}
          {filteredCoffeeProducts.map((coffee) => (
            <div
              key={coffee.id}
              className="p-3 hover:bg-muted rounded-md cursor-pointer transition-colors"
              onClick={() => handleProductClick(coffee.id)}
            >
              <div className="font-medium">{coffee.name}</div>
              <div className="text-sm text-muted-foreground truncate">{coffee.description}</div>
              <div className="text-sm font-medium mt-1">${coffee.price.toFixed(2)}</div>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  )
}
