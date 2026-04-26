import React, { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';
import { ShoppingCart, Plus, Minus, Upload, CreditCard, Smartphone, Banknote } from 'lucide-react';

// Mock cart data
const mockCartItems = [
  {
    id: '1',
    name: 'Paracetamol 500mg',
    price: 50,
    quantity: 2,
    prescriptionRequired: false
  },
  {
    id: '2',
    name: 'Amoxicillin 250mg',
    price: 120,
    quantity: 1,
    prescriptionRequired: true
  }
];

const Cart: React.FC = () => {
  const { t } = useLanguage();
  const [cartItems, setCartItems] = useState(mockCartItems);
  const [paymentMode, setPaymentMode] = useState('upi');
  const [address, setAddress] = useState('');
  const [prescriptionFile, setPrescriptionFile] = useState<File | null>(null);

  const updateQuantity = (id: string, delta: number) => {
    setCartItems(prev =>
      prev.map(item =>
        item.id === id
          ? { ...item, quantity: Math.max(0, item.quantity + delta) }
          : item
      ).filter(item => item.quantity > 0)
    );
  };

  const removeItem = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const deliveryFee = 30;
  const total = subtotal + deliveryFee;

  const requiresPrescription = cartItems.some(item => item.prescriptionRequired);

  const handlePrescriptionUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setPrescriptionFile(e.target.files[0]);
    }
  };

  const handleCheckout = () => {
    if (requiresPrescription && !prescriptionFile) {
      alert('Please upload prescription for prescription medicines');
      return;
    }
    if (!address.trim()) {
      alert('Please enter delivery address');
      return;
    }
    console.log('Checkout:', { cartItems, paymentMode, address, prescriptionFile });
    // Handle checkout logic
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2 flex items-center">
            <ShoppingCart className="w-8 h-8 mr-3 text-primary" />
            {t('nav.cart')}
          </h1>
        </div>

        {cartItems.length === 0 ? (
          <div className="text-center py-12">
            <ShoppingCart className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-medium text-foreground mb-2">Your cart is empty</h3>
            <p className="text-muted-foreground mb-4">
              Add some medicines to get started
            </p>
            <Button onClick={() => window.location.href = '/medicines'}>
              Browse Medicines
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Cart Items ({cartItems.length})</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex items-center justify-between border-b pb-4 last:border-b-0">
                      <div className="flex-1">
                        <h4 className="font-medium">{item.name}</h4>
                        <p className="text-sm text-muted-foreground">₹{item.price} each</p>
                        {item.prescriptionRequired && (
                          <Badge variant="destructive" className="mt-1">
                            {t('medicine.prescription.required')}
                          </Badge>
                        )}
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => updateQuantity(item.id, -1)}
                        >
                          <Minus className="w-4 h-4" />
                        </Button>
                        <span className="w-8 text-center font-medium">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => updateQuantity(item.id, 1)}
                        >
                          <Plus className="w-4 h-4" />
                        </Button>
                      </div>
                      
                      <div className="text-right min-w-[80px]">
                        <p className="font-medium">₹{item.price * item.quantity}</p>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeItem(item.id)}
                          className="text-destructive hover:text-destructive"
                        >
                          Remove
                        </Button>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Prescription Upload */}
              {requiresPrescription && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Upload className="w-5 h-5 mr-2 text-primary" />
                      Upload Prescription
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <p className="text-sm text-muted-foreground">
                        Your cart contains prescription medicines. Please upload a valid prescription.
                      </p>
                      <div>
                        <Label htmlFor="prescription">Prescription Image/PDF</Label>
                        <Input
                          id="prescription"
                          type="file"
                          accept="image/*,.pdf"
                          onChange={handlePrescriptionUpload}
                          className="mt-1"
                        />
                        {prescriptionFile && (
                          <p className="text-sm text-medical-success mt-2">
                            ✓ {prescriptionFile.name} uploaded
                          </p>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Checkout Section */}
            <div className="space-y-4">
              {/* Delivery Address */}
              <Card>
                <CardHeader>
                  <CardTitle>Delivery Address</CardTitle>
                </CardHeader>
                <CardContent>
                  <Textarea
                    placeholder="Enter your delivery address..."
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="min-h-[100px]"
                  />
                </CardContent>
              </Card>

              {/* Payment Method */}
              <Card>
                <CardHeader>
                  <CardTitle>Payment Method</CardTitle>
                </CardHeader>
                <CardContent>
                  <RadioGroup value={paymentMode} onValueChange={setPaymentMode}>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="upi" id="upi" />
                      <Label htmlFor="upi" className="flex items-center space-x-2">
                        <Smartphone className="w-4 h-4" />
                        <span>UPI</span>
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="card" id="card" />
                      <Label htmlFor="card" className="flex items-center space-x-2">
                        <CreditCard className="w-4 h-4" />
                        <span>Credit/Debit Card</span>
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="cod" id="cod" />
                      <Label htmlFor="cod" className="flex items-center space-x-2">
                        <Banknote className="w-4 h-4" />
                        <span>Cash on Delivery</span>
                      </Label>
                    </div>
                  </RadioGroup>
                </CardContent>
              </Card>

              {/* Order Summary */}
              <Card>
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>₹{subtotal}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Delivery Fee</span>
                    <span>₹{deliveryFee}</span>
                  </div>
                  <div className="border-t pt-2">
                    <div className="flex justify-between font-bold text-lg">
                      <span>Total</span>
                      <span className="text-primary">₹{total}</span>
                    </div>
                  </div>
                  <Button 
                    onClick={handleCheckout}
                    className="w-full mt-4 bg-primary hover:bg-primary-dark"
                    size="lg"
                  >
                    Place Order
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Cart;