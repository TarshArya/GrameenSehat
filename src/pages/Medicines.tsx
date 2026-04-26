import React, { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useLanguage } from '@/contexts/LanguageContext';
import { mockMedicines, medicineCategories, storeLocations } from '@/data/mockData';
import { Search, ShoppingCart, Plus, Minus, MapPin } from 'lucide-react';
import { Medicine } from '@/types';

const Medicines: React.FC = () => {
  const { t, language } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [quantities, setQuantities] = useState<Record<string, number>>({});

  const getStockForLocation = (medicine: Medicine) => {
    if (selectedLocation === 'all') {
      return medicine.stock;
    }
    return medicine.storeStock?.[selectedLocation] || 0;
  };

  const filteredMedicines = mockMedicines.filter(medicine => {
    const matchesSearch = medicine.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         medicine.namepunjabi.includes(searchTerm);
    const matchesCategory = selectedCategory === 'All' || medicine.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const updateQuantity = (medicineId: string, delta: number) => {
    setQuantities(prev => ({
      ...prev,
      [medicineId]: Math.max(0, (prev[medicineId] || 0) + delta)
    }));
  };

  const addToCart = (medicine: Medicine) => {
    const quantity = quantities[medicine.id] || 1;
    console.log('Added to cart:', { medicine, quantity });
    // Here you would typically update a cart context or make an API call
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            {t('medicine.category')}
          </h1>
          
          {/* Search and Location */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                type="text"
                placeholder={t('medicine.search.placeholder')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                <SelectTrigger className="pl-10">
                  <SelectValue placeholder="Select location" />
                </SelectTrigger>
                <SelectContent className="bg-background border border-border">
                  {storeLocations.map((location) => (
                    <SelectItem key={location.id} value={location.id}>
                      {language === 'pa' ? location.namePunjabi : location.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 mb-6">
            {medicineCategories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className={selectedCategory === category ? "bg-primary" : ""}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Medicine Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredMedicines.length > 0 ? (
            filteredMedicines.map((medicine) => (
              <Card key={medicine.id} className="shadow-card hover:shadow-medical transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg">
                    {language === 'pa' ? medicine.namepunjabi : medicine.name}
                  </CardTitle>
                  <CardDescription>
                    {language === 'pa' ? medicine.descriptionPunjabi : medicine.description}
                  </CardDescription>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">{medicine.category}</Badge>
                    {medicine.prescriptionRequired && (
                      <Badge variant="destructive" className="text-xs">
                        {t('medicine.prescription.required')}
                      </Badge>
                    )}
                    <Badge 
                      variant={medicine.stock > 0 ? "default" : "secondary"}
                      className={medicine.stock > 0 ? "bg-medical-success" : ""}
                    >
                      {medicine.stock > 0 ? t('medicine.in.stock') : t('medicine.out.of.stock')}
                    </Badge>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-bold text-primary">
                      ₹{medicine.price}
                    </span>
                    <div className="text-right">
                      <div className="text-sm text-muted-foreground">
                        Stock: {getStockForLocation(medicine)}
                      </div>
                      {selectedLocation !== 'all' && (
                        <div className="text-xs text-muted-foreground">
                          at {language === 'pa' 
                            ? storeLocations.find(l => l.id === selectedLocation)?.namePunjabi
                            : storeLocations.find(l => l.id === selectedLocation)?.name
                          }
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mb-4">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => updateQuantity(medicine.id, -1)}
                      disabled={!quantities[medicine.id] || quantities[medicine.id] <= 0}
                    >
                      <Minus className="w-4 h-4" />
                    </Button>
                    <span className="w-8 text-center font-medium">
                      {quantities[medicine.id] || 0}
                    </span>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => updateQuantity(medicine.id, 1)}
                      disabled={getStockForLocation(medicine) === 0}
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>

                  <Button
                    onClick={() => addToCart(medicine)}
                    className="w-full bg-primary hover:bg-primary-dark"
                    disabled={getStockForLocation(medicine) === 0 || !quantities[medicine.id]}
                  >
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    {t('medicine.add.to.cart')}
                  </Button>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-muted-foreground text-lg">
                {t('medicine.no.results')}
              </p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Medicines;