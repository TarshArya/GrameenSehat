import React from 'react';
import { Layout } from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { 
  MapPin, 
  Package, 
  Truck, 
  CheckCircle, 
  Clock,
  Phone,
  User,
  Navigation
} from 'lucide-react';

const OrderTracking: React.FC = () => {
  const { t } = useLanguage();

  // Mock order data
  const orderData = {
    id: 'ORD001',
    status: 'out_for_delivery',
    estimatedDelivery: '25 mins',
    driverName: 'Gurpreet Singh',
    driverPhone: '+91 98765 43210',
    vehicleNumber: 'PB 11 AB 1234',
    currentLocation: 'Near City Hospital, Nabha',
    deliveryAddress: '123 Main Street, Nabha, Punjab - 147201'
  };

  const trackingSteps = [
    {
      status: 'pending',
      title: 'Order Placed',
      description: 'Your order has been received',
      time: '10:30 AM',
      completed: true
    },
    {
      status: 'confirmed',
      title: 'Order Confirmed',
      description: 'Pharmacy confirmed your order',
      time: '10:35 AM',
      completed: true
    },
    {
      status: 'packed',
      title: 'Order Packed',
      description: 'Medicines packed and ready',
      time: '10:45 AM',
      completed: true
    },
    {
      status: 'out_for_delivery',
      title: 'Out for Delivery',
      description: 'Driver is on the way',
      time: '11:00 AM',
      completed: true,
      current: true
    },
    {
      status: 'delivered',
      title: 'Delivered',
      description: 'Order delivered successfully',
      time: 'Expected: 11:25 AM',
      completed: false
    }
  ];

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Track Order #{orderData.id}
          </h1>
          <p className="text-muted-foreground">
            Real-time tracking of your medicine delivery
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Tracking Timeline */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Package className="w-5 h-5 mr-2 text-primary" />
                  Order Status
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {trackingSteps.map((step, index) => (
                    <div key={step.status} className="flex items-start space-x-3">
                      <div className="flex flex-col items-center">
                        <div 
                          className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            step.completed 
                              ? 'bg-medical-success text-white' 
                              : step.current
                                ? 'bg-primary text-primary-foreground'
                                : 'bg-gray-200 text-gray-400'
                          }`}
                        >
                          {step.completed ? (
                            <CheckCircle className="w-4 h-4" />
                          ) : step.current ? (
                            <Clock className="w-4 h-4" />
                          ) : (
                            <div className="w-2 h-2 bg-current rounded-full" />
                          )}
                        </div>
                        {index < trackingSteps.length - 1 && (
                          <div 
                            className={`w-0.5 h-8 mt-2 ${
                              step.completed ? 'bg-medical-success' : 'bg-gray-200'
                            }`}
                          />
                        )}
                      </div>
                      <div className="flex-1">
                        <h3 className={`font-medium ${step.current ? 'text-primary' : ''}`}>
                          {step.title}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {step.description}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {step.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Estimated Delivery */}
            <Card className="border-primary bg-primary-light">
              <CardContent className="p-6">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-primary rounded-lg">
                    <Clock className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-medium text-primary">Estimated Delivery</h3>
                    <p className="text-lg font-bold text-primary">
                      {orderData.estimatedDelivery}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Driver Info & Map */}
          <div className="space-y-6">
            {/* Driver Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Truck className="w-5 h-5 mr-2 text-primary" />
                  Delivery Partner
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                    <User className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-medium">{orderData.driverName}</h3>
                    <p className="text-sm text-muted-foreground">
                      Vehicle: {orderData.vehicleNumber}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <MapPin className="w-4 h-4" />
                  <span>Current location: {orderData.currentLocation}</span>
                </div>

                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => window.open(`tel:${orderData.driverPhone}`)}
                >
                  <Phone className="w-4 h-4 mr-2" />
                  Call Driver
                </Button>
              </CardContent>
            </Card>

            {/* Live Map Placeholder */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Navigation className="w-5 h-5 mr-2 text-primary" />
                  Live Tracking
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="aspect-square bg-accent rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="w-12 h-12 text-primary mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">Live map tracking</p>
                    <p className="text-xs text-muted-foreground">
                      Real-time location updates
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Delivery Address */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MapPin className="w-5 h-5 mr-2 text-primary" />
                  Delivery Address
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm">{orderData.deliveryAddress}</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Order Items */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Order Items</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center border-b pb-2">
                <div>
                  <h4 className="font-medium">Paracetamol 500mg</h4>
                  <p className="text-sm text-muted-foreground">Qty: 2</p>
                </div>
                <span className="font-medium">₹100</span>
              </div>
              <div className="flex justify-between items-center border-b pb-2">
                <div>
                  <h4 className="font-medium">Cough Syrup</h4>
                  <p className="text-sm text-muted-foreground">Qty: 1</p>
                </div>
                <span className="font-medium">₹80</span>
              </div>
              <div className="flex justify-between items-center font-bold pt-2">
                <span>Total Amount</span>
                <span className="text-primary">₹180</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default OrderTracking;