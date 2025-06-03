import { Suspense } from "react";
import { Link, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { House, List } from "lucide-react";
import { Toaster } from "sonner";

import { SearchButton } from "./components/search-button";
import { Button } from "./components/ui/button";
import About from "./features/about/About";
import Cart from "./features/cart/Cart";
import Home from "./features/home/Home";
import Checkout from "./features/orders/Checkout";
import OrderConfirmation from "./features/orders/OrderConfirmation";
import { CartProvider } from "./features/cart/components/cart-provider";
import { CartButton } from "./features/cart/components/cart-button";
import Orders from "./features/orders/Orders";

function App() {
  return (
    <Router>
      <CartProvider>
        <div className="flex min-h-screen flex-col">
          <Toaster />
          <header className="border-b">
            <div className="container mx-auto px-4 py-4 flex items-center justify-between">
              <Link to="/" className="text-xl font-bold">
                Artisan Coffee
              </Link>
              <nav className="flex items-center gap-4">
                <Link to="/" className="text-sm font-medium">
                  <Button variant="ghost" size="icon">
                    <House className="h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/orders" className="text-sm font-medium">
                  <Button variant="ghost" size="icon">
                    <List className="h-5 w-5" />
                  </Button>
                </Link>
                <Suspense fallback={<div>Loading...</div>}>
                  <SearchButton />
                </Suspense>
                <Suspense fallback={<div>Loading...</div>}>
                  <CartButton />
                </Suspense>
              </nav>
            </div>
          </header>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/order-confirmation" element={<OrderConfirmation />} />
            <Route path="/orders" element={<Orders />} />
          </Routes>
          <footer className="mt-auto border-t py-6">
            <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
              © {new Date().getFullYear()} Artisan Coffee Shop. All rights
              reserved.
            </div>
          </footer>
        </div>
      </CartProvider>
    </Router>
  );
}

export default App;
