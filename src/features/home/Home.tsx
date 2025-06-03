import { CoffeeProducts } from "./components/coffee-products";

function Home() {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">
        Artisan Coffee Shop
      </h1>
      <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
        Discover our carefully selected coffee beans from around the world,
        roasted to perfection and delivered fresh to your doorstep.
      </p>
      <CoffeeProducts />
    </main>
  );
}

export default Home;
