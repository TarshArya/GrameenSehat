import React from 'react';
import { Link } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';
import { Search, Clock, Shield, Truck, Video, Stethoscope, Pill } from 'lucide-react';

const Index = () => {
    const { t } = useLanguage();

    const features = [
        {
            icon: Clock,
            title: t('home.fast.title'),
            description: t('home.fast.desc'),
        },
        {
            icon: Shield,
            title: t('home.genuine.title'),
            description: t('home.genuine.desc'),
        },
        {
            icon: Truck,
            title: t('home.tracking.title'),
            description: t('home.tracking.desc'),
        },
    ];

    const services = [
        {
            icon: Pill,
            title: 'Medicine Delivery',
            description: 'Order medicines with fast delivery',
            link: '/medicines',
            color: 'text-blue-600'
        },
        {
            icon: Video,
            title: t('nav.consultation'),
            description: t('home.telemedicine.desc'),
            link: '/consultation',
            color: 'text-green-600'
        },
        {
            icon: Stethoscope,
            title: t('nav.symptom_checker'),
            description: 'Check symptoms and get recommendations',
            link: '/symptom-checker',
            color: 'text-purple-600'
        },
    ];

    return (
        <Layout>
            {/* Hero Section */}
            <section className="bg-gradient-to-br from-primary via-primary to-primary-dark text-primary-foreground">
                <div className="container mx-auto px-4 py-20">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <h1 className="text-4xl md:text-6xl font-bold mb-6">
                                {t('home.hero.title')}
                            </h1>
                            <p className="text-xl mb-8 text-primary-foreground/90">
                                {t('home.hero.subtitle')}
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4 mb-8">
                                <Link to="/consultation">
                                    <Button size="lg" className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white shadow-lg">
                                        <Video className="w-5 h-5 mr-2" />
                                        {t('home.telemedicine.button')}
                                    </Button>
                                </Link>
                                <Link to="/medicines">
                                    <Button size="lg" variant="secondary">
                                        <Pill className="w-5 h-5 mr-2" />
                                        {t('home.browse.button')}
                                    </Button>
                                </Link>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4 mb-4">
                                <div className="relative flex-1 max-w-md">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                                    <Input
                                        type="text"
                                        placeholder={t('home.search.placeholder')}
                                        className="pl-10 bg-white/90 text-foreground text-sm"
                                    />
                                </div>
                                <Button
                                    variant="secondary"
                                    className="text-gray-900 hover:bg-gray-100"
                                >
                                    <Search className="w-4 h-4 mr-2" />
                                    {t('home.search.button')}
                                </Button>
                            </div>
                        </div>

                        {/* Replaced plus sign and circles with only the logo */}
                        <div className="relative flex justify-center">
                            <img
                                src="/logo.png"  // Ensure logo.png is in the public folder
                                alt="GrameenSehat Logo"
                                className="w-80 h-80 md:w-80 md:h-80 object-contain"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-16 bg-background">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-foreground mb-4">
                            {t('home.why.title')}
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {features.map((feature, index) => {
                            const Icon = feature.icon;
                            return (
                                <Card key={index} className="text-center shadow-card">
                                    <CardContent className="p-8">
                                        <div className="w-16 h-16 bg-primary-light rounded-full flex items-center justify-center mx-auto mb-4">
                                            <Icon className="w-8 h-8 text-primary" />
                                        </div>
                                        <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                                        <p className="text-muted-foreground">{feature.description}</p>
                                    </CardContent>
                                </Card>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Services Section */}
            <section className="py-16 bg-accent">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-foreground mb-4">Our Services</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {services.map((service, index) => {
                            const Icon = service.icon;
                            return (
                                <Link key={index} to={service.link}>
                                    <Card className="hover:shadow-medical transition-shadow cursor-pointer">
                                        <CardContent className="p-6">
                                            <Icon className={`w-8 h-8 ${service.color} mb-4`} />
                                            <h3 className="text-lg font-semibold mb-2">{service.title}</h3>
                                            <p className="text-muted-foreground">{service.description}</p>
                                        </CardContent>
                                    </Card>
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Health Records Preview Section */}
            <section className="py-16 bg-background">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-foreground mb-4">
                            {t('home.health_records.title')}
                        </h2>
                        <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                            {t('home.health_records.subtitle')}
                        </p>
                    </div>

                    <div className="max-w-4xl mx-auto">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                            {/* Medical Records Card */}
                            <Card className="shadow-card">
                                <CardContent className="p-6">
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-primary-light rounded-lg flex items-center justify-center">
                                                <Stethoscope className="w-5 h-5 text-primary" />
                                            </div>
                                            <div>
                                                <h3 className="font-semibold text-foreground">General Consultation</h3>
                                                <p className="text-sm text-muted-foreground">Dr. Rajesh Kumar</p>
                                            </div>
                                        </div>
                                        <span className="text-xs bg-accent text-accent-foreground px-2 py-1 rounded">prescription</span>
                                    </div>
                                    <div className="text-sm text-muted-foreground mb-3">
                                        <Clock className="w-4 h-4 inline mr-1" />
                                        1/15/2024
                                    </div>
                                    <div className="mb-4">
                                        <p className="text-sm font-medium mb-2">Medications:</p>
                                        <div className="flex gap-2">
                                            <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">Paracetamol 500mg</span>
                                            <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">Vitamin D3</span>
                                        </div>
                                    </div>
                                    <Button variant="outline" size="sm" className="w-full">
                                        View Details
                                    </Button>
                                </CardContent>
                            </Card>

                            {/* Lab Report Card */}
                            <Card className="shadow-card">
                                <CardContent className="p-6">
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                                                <svg viewBox="0 0 24 24" className="w-5 h-5 text-green-600" fill="currentColor">
                                                    <path d="M12 2L13.5 8.5L20 8.5L15 12.5L16.5 19L12 15.5L7.5 19L9 12.5L4 8.5L10.5 8.5Z"/>
                                                </svg>
                                            </div>
                                            <div>
                                                <h3 className="font-semibold text-foreground">Blood Test Report</h3>
                                                <p className="text-sm text-muted-foreground">Pathology Lab, Nabha</p>
                                            </div>
                                        </div>
                                        <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">lab report</span>
                                    </div>
                                    <div className="text-sm text-muted-foreground mb-3">
                                        <Clock className="w-4 h-4 inline mr-1" />
                                        1/10/2024
                                    </div>
                                    <div className="mb-4">
                                        <p className="text-sm font-medium mb-2">Tests:</p>
                                        <div className="flex gap-2 flex-wrap">
                                            <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">CBC</span>
                                            <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Blood Sugar</span>
                                            <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Cholesterol</span>
                                        </div>
                                    </div>
                                    <Button variant="outline" size="sm" className="w-full">
                                        View Details
                                    </Button>
                                </CardContent>
                            </Card>
                        </div>

                        <div className="text-center">
                            <Link to="/health-records">
                                <Button size="lg" className="bg-primary hover:bg-primary/90">
                                    {t('home.health_records.button')}
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 bg-primary text-primary-foreground">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold mb-4">{t('home.urgent.title')}</h2>
                    <p className="text-xl mb-8 text-primary-foreground/90 max-w-2xl mx-auto">
                        {t('home.urgent.desc')}
                    </p>
                    <Link to="/medicines">
                        <Button size="lg" variant="secondary">
                            {t('home.urgent.button')}
                        </Button>
                    </Link>
                </div>
            </section>
        </Layout>
    );
};

export default Index;
