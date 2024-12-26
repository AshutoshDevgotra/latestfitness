'use client';

import { useCartStore } from '@/store/cart';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { LoginDialog } from '@/components/auth/login-dialog';
import { useAuth } from '@/lib/hooks/useAuth';

export default function CartPage() {
  const { items, removeItem, updateQuantity } = useCartStore();
  const router = useRouter();
  const { user } = useAuth();

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = () => {
    if (user) {
      router.push('/checkout');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Shopping Cart</h1>
        {!user && (
          <LoginDialog 
            trigger={<Button variant="outline">Sign In</Button>}
          />
        )}
      </div>
      
      {items.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-4">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between p-4 bg-white rounded-lg shadow"
              >
                <div className="flex items-center space-x-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div>
                    <h3 className="font-semibold">{item.name}</h3>
                    <p className="text-sm text-gray-500">${item.price}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) =>
                      updateQuantity(item.id, parseInt(e.target.value))
                    }
                    className="w-16 p-1 border rounded"
                  />
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => removeItem(item.id)}
                  >
                    Remove
                  </Button>
                </div>
              </div>
            ))}
          </div>
          <div className="bg-white p-6 rounded-lg shadow h-fit">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <div className="border-t pt-2 mt-2">
                <div className="flex justify-between font-semibold">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
            </div>
            {user ? (
              <Button
                className="w-full mt-6"
                onClick={handleCheckout}
              >
                Proceed to Checkout
              </Button>
            ) : (
              <LoginDialog 
                trigger={
                  <Button className="w-full mt-6">
                    Sign in to Checkout
                  </Button>
                }
                redirectPath="/checkout"
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
}