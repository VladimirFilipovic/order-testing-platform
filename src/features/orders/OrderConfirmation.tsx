import { CheckCircle, Coffee } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useSearchParams } from "react-router-dom";

export default function OrderConfirmationPage() {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get("orderId") || "#12345";

  return (
    <div className="container mx-auto px-4 py-12 text-center max-w-md">
      <CheckCircle className="mx-auto h-16 w-16 text-green-500" />
      <h1 className="mt-6 text-3xl font-bold">Order Confirmed!</h1>
      <p className="mt-4 text-muted-foreground">
        Thank you for your order. We've received your payment and will begin
        processing your coffee right away.
      </p>

      <div className="mt-8 p-6 border rounded-lg bg-muted/40">
        <h2 className="font-semibold text-lg">Order {orderId}</h2>
        <p className="text-sm text-muted-foreground mt-1">
          A confirmation email has been sent to your email address.
        </p>
        <div className="mt-4 text-sm">
          <p>Estimated delivery: 3-5 business days</p>
        </div>
      </div>

      <div className="mt-8 flex flex-col gap-4">
        <Button asChild>
          <Link to="/">
            <Coffee className="mr-2 h-4 w-4" /> Continue Shopping
          </Link>
        </Button>
        <Button variant="outline" asChild>
          <Link to="/orders">View All Orders</Link>
        </Button>
      </div>
    </div>
  );
}
