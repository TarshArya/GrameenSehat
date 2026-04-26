import React, { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { Package, MapPin, Clock, CreditCard, Truck } from 'lucide-react';

// Mock orders data
const mockOrders = [
  {
    id: 'ORD001',
    medicines: [
      { name: 'Paracetamol 500mg', quantity: 2, price: 50 },
      { name: 'Cough Syrup', quantity: 1, price: 80 }
    ],
    status: 'out_for_delivery' as const,
    totalAmount: 180,
    deliveryAddress: '123 Main Street, Nabha, Punjab',
    paymentMode: 'upi' as const,
    paymentStatus: 'paid' as const,
    estimatedDelivery: '30 mins',
    createdAt: '2024-01-15T10:30:00Z'
  },
  {
    id: 'ORD002',
    medicines: [
      { name: 'Vitamin D3', quantity: 1, price: 200 }
    ],
    status: 'delivered' as const,
    totalAmount: 200,
    deliveryAddress: '456 Park Road, Patiala, Punjab',
    paymentMode: 'cod' as const,
    paymentStatus: 'paid' as const,
    createdAt: '2024-01-14T14:20:00Z'
  }
];

const Orders: React.FC = () => {
  const { t } = useLanguage();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-500';
      case 'confirmed': return 'bg-blue-500';
      case 'packed': return 'bg-purple-500';
      case 'out_for_delivery': return 'bg-orange-500';
      case 'delivered': return 'bg-medical-success';
      default: return 'bg-gray-500';
    }
  };

  const getPaymentModeIcon = (mode: string) => {
    switch (mode) {
      case 'upi': return '📱';
      case 'card': return '💳';
      case 'cod': return '💰';
      default: return '💳';
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            {t('nav.orders')}
          </h1>
          <p className="text-muted-foreground">
            Track your medicine orders and delivery status
          </p>
        </div>

        <div className="space-y-6">
          {mockOrders.map((order) => (
            <Card key={order.id} className="shadow-card">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg">Order #{order.id}</CardTitle>
                    <CardDescription>
                      {new Date(order.createdAt).toLocaleDateString()} at{' '}
                      {new Date(order.createdAt).toLocaleTimeString()}
                    </CardDescription>
                  </div>
                  <Badge className={`${getStatusColor(order.status)} text-white`}>
                    {t(`order.status.${order.status}`)}
                  </Badge>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Order Items */}
                <div className="space-y-2">
                  <h4 className="font-medium flex items-center">
                    <Package className="w-4 h-4 mr-2 text-primary" />
                    Medicines Ordered
                  </h4>
                  {order.medicines.map((medicine, index) => (
                    <div key={index} className="flex justify-between items-center bg-accent p-3 rounded-lg">
                      <div>
                        <span className="font-medium">{medicine.name}</span>
                        <span className="text-sm text-muted-foreground ml-2">
                          Qty: {medicine.quantity}
                        </span>
                      </div>
                      <span className="font-medium">₹{medicine.price * medicine.quantity}</span>
                    </div>
                  ))}
                </div>

                {/* Delivery Address */}
                <div className="flex items-start space-x-2">
                  <MapPin className="w-4 h-4 mt-1 text-primary flex-shrink-0" />
                  <div>
                    <h4 className="font-medium">{t('order.delivery.address')}</h4>
                    <p className="text-sm text-muted-foreground">{order.deliveryAddress}</p>
                  </div>
                </div>

                {/* Payment Info */}
                <div className="flex items-center space-x-6">
                  <div className="flex items-center space-x-2">
                    <CreditCard className="w-4 h-4 text-primary" />
                    <span className="font-medium">{t('order.payment.mode')}:</span>
                    <span className="text-sm">
                      {getPaymentModeIcon(order.paymentMode)} {order.paymentMode.toUpperCase()}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="font-medium">{t('order.total')}:</span>
                    <span className="text-lg font-bold text-primary">₹{order.totalAmount}</span>
                  </div>
                </div>

                {/* Estimated Delivery */}
                {order.status !== 'delivered' && order.estimatedDelivery && (
                  <div className="flex items-center space-x-2 bg-primary-light p-3 rounded-lg">
                    <Clock className="w-4 h-4 text-primary" />
                    <span className="font-medium text-primary">
                      Estimated delivery: {order.estimatedDelivery}
                    </span>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex gap-2 pt-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => console.log('Track order:', order.id)}
                  >
                    <Truck className="w-4 h-4 mr-2" />
                    {t('order.track')}
                  </Button>
                  {order.status === 'delivered' && (
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => console.log('View bill:', order.id)}
                    >
                      <CreditCard className="w-4 h-4 mr-2" />
                      View Bill
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {mockOrders.length === 0 && (
          <div className="text-center py-12">
            <Package className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-medium text-foreground mb-2">No orders yet</h3>
            <p className="text-muted-foreground mb-4">
              Start by browsing our medicine catalog
            </p>
            <Button onClick={() => window.location.href = '/medicines'}>
              Browse Medicines
            </Button>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Orders;