import React, { createContext, useContext, useState } from 'react';
import { Language, LanguageContextType } from '@/types';

const translations = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.medicines': 'Medicines',
    'nav.orders': 'My Orders',
    'nav.cart': 'Cart',
    'nav.login': 'Login',
    'nav.consultation': 'Consultation',
    'nav.health_records': 'Health Records',
    'nav.symptom_checker': 'Symptom Checker',
    
    // Home page
    'home.hero.title': 'HealthCare Delivered in Minutes',
    'home.hero.subtitle': 'Bridging Rural HealthCare Gaps. \nFast, reliable, and safe.',
    'home.search.placeholder': 'Search for medicines...',
    'home.search.button': 'Search',
    'home.browse.button': 'Browse Medicines',
    'home.why.title': 'Why Choose GrameenSehat?',
    'home.fast.title': 'Fast Delivery',
    'home.fast.desc': 'Medicines delivered to your doorstep within 30 minutes',
    'home.genuine.title': 'Genuine Products',
    'home.genuine.desc': '100% authentic medicines from licensed pharmacies',
    'home.tracking.title': 'Real-time Tracking',
    'home.tracking.desc': 'Track your order in real-time from store to delivery',
    'home.urgent.title': 'Need Medicines Urgently?',
    'home.urgent.desc': "Don't wait in long pharmacy queues. Get your prescriptions and over-the-counter medications delivered quickly.",
    'home.urgent.button': 'Order Now',
    'home.telemedicine.title': 'Telemedicine Services',
    'home.telemedicine.desc': 'Connect with qualified doctors from the comfort of your home',
    'home.telemedicine.button': 'Book Consultation',
    'home.health_records.title': 'Manage Your Health Records',
    'home.health_records.subtitle': 'Keep track of your medical history, prescriptions, and lab reports in one secure place',
    'home.health_records.button': 'View All Records',
    
    // Common
    'common.loading': 'Loading...',
    'common.error': 'Error',
    'common.success': 'Success',
    'common.save': 'Save',
    'common.cancel': 'Cancel',
    'common.continue': 'Continue',
    'common.back': 'Back',
    'common.next': 'Next',
    'common.yes': 'Yes',
    'common.no': 'No',
    
    // Login/Register
    'auth.login.title': 'Welcome Back',
    'auth.login.subtitle': 'Login to your account to order medicines',
    'auth.register.title': 'Create Account',
    'auth.register.subtitle': 'Join MediSwift for instant medicine delivery',
    'auth.email': 'Email',
    'auth.password': 'Password',
    'auth.name': 'Full Name',
    'auth.phone': 'Phone Number',
    'auth.login.button': 'Login',
    'auth.register.button': 'Register',
    'auth.switch.to.register': 'Don\'t have an account? Register',
    'auth.switch.to.login': 'Already have an account? Login',
    'auth.forgot.password': 'Forgot Password?',
    
    // User types
    'auth.user.type': 'I am a',
    'auth.user.patient': 'Patient',
    'auth.user.doctor': 'Doctor',
    
    // Language
    'language.select': 'Select Language',
    'language.english': 'English',
    'language.punjabi': 'ਪੰਜਾਬੀ',
    
    // Medicine related
    'medicine.category': 'Medicine Category',
    'medicine.search.placeholder': 'Search for medicines...',
    'medicine.no.results': 'No medicines found',
    'medicine.add.to.cart': 'Add to Cart',
    'medicine.prescription.required': 'Prescription Required',
    'medicine.in.stock': 'In Stock',
    'medicine.out.of.stock': 'Out of Stock',
    'medicine.price': 'Price',
    'medicine.quantity': 'Quantity',
    
    // Orders
    'order.status.pending': 'Pending',
    'order.status.confirmed': 'Confirmed',
    'order.status.packed': 'Packed',
    'order.status.out_for_delivery': 'Out for Delivery',
    'order.status.delivered': 'Delivered',
    'order.track': 'Track Order',
    'order.total': 'Total Amount',
    'order.payment.mode': 'Payment Mode',
    'order.delivery.address': 'Delivery Address',
    
    // Health Records
    'health.records.title': 'Digital Health Records',
    'health.records.add': 'Add Record',
    'health.records.view': 'View Records',
    
    // Symptom Checker
    'symptom.checker.title': 'Symptom Checker',
    'symptom.checker.subtitle': 'Answer a few questions to get health recommendations',
    'symptom.checker.start': 'Start Assessment',
    'symptom.checker.ai.title': 'AI-Powered Symptom Checker',
    'symptom.checker.ai.subtitle': 'Get preliminary health insights powered by artificial intelligence',
    'symptom.checker.enter.info': 'Enter Your Information',
    'symptom.checker.form.subtitle': 'Provide your details and symptoms for AI-powered analysis',
    'symptom.checker.age': 'Age',
    'symptom.checker.age.placeholder': 'Enter your age',
    'symptom.checker.gender': 'Gender',
    'symptom.checker.gender.male': 'Male',
    'symptom.checker.gender.female': 'Female',
    'symptom.checker.gender.other': 'Other',
    'symptom.checker.gender.prefer.not.to.say': 'Prefer not to say',
    'symptom.checker.symptoms': 'Symptoms',
    'symptom.checker.symptoms.placeholder': 'Describe your symptoms in detail. Include when they started, severity, what makes them better or worse, and any other relevant information...',
    'symptom.checker.analyze': 'Analyze Symptoms',
    'symptom.checker.analyzing': 'Analyzing...',
    'symptom.checker.assessment.complete': 'AI Assessment Complete',
    'symptom.checker.ai.recommendation': 'Based on your symptoms, here\'s our AI-powered recommendation',
    'symptom.checker.possible.conditions': 'Possible Conditions:',
    'symptom.checker.next.steps': 'Next Steps:',
    'symptom.checker.recommended.specialist': 'Recommended Specialist:',
    'symptom.checker.book.consultation.now': 'Book Consultation Now',
    'symptom.checker.call.emergency': 'Call Emergency Services',
    'symptom.checker.new.assessment': 'New Assessment',
    'symptom.checker.disclaimer': '⚠️ This AI assessment is for informational purposes only and does not replace professional medical advice.',
    'symptom.checker.tool.disclaimer': '⚠️ This tool provides preliminary information only and should not replace professional medical consultation.',

    // Consultation
    'consultation.book': 'Book Consultation',
    'consultation.video.call': 'Video Consultation',
    'consultation.doctor.available': 'Available Now',
    'consultation.fee': 'Consultation Fee',
  },
  pa: {
    // Navigation
    'nav.home': 'ਘਰ',
    'nav.medicines': 'ਦਵਾਈਆਂ',
    'nav.orders': 'ਮੇਰੇ ਆਰਡਰ',
    'nav.cart': 'ਕਾਰਟ',
    'nav.login': 'ਲਾਗਇਨ',
    'nav.dashboard': 'ਡੈਸ਼ਬੋਰਡ',
    'nav.consultation': 'ਸਲਾਹ',
    'nav.health_records': 'ਸਿਹਤ ਰਿਕਾਰਡ',
    'nav.symptom_checker': 'ਲੱਛਣ ਜਾਂਚ',
    
    // Home page
    'home.hero.title': 'ਮਿੰਟਾਂ ਵਿੱਚ ਦਵਾਈਆਂ ਦੀ ਡਿਲੀਵਰੀ',
    'home.hero.subtitle': '30 ਮਿੰਟ ਵਿੱਚ ਆਪਣੀਆਂ ਜ਼ਰੂਰੀ ਦਵਾਈਆਂ ਆਪਣੇ ਘਰ ਮੰਗਵਾਓ। ਤੇਜ਼, ਭਰੋਸੇਮੰਦ ਅਤੇ ਸੁਰੱਖਿਅਤ।',
    'home.search.placeholder': 'ਦਵਾਈਆਂ ਖੋਜੋ...',
    'home.search.button': 'ਖੋਜੋ',
    'home.browse.button': 'ਦਵਾਈਆਂ ਦੇਖੋ',
    'home.why.title': 'ਮੈਡੀਸਵਿਫਟ ਕਿਉਂ ਚੁਣੋ?',
    'home.fast.title': 'ਤੇਜ਼ ਡਿਲੀਵਰੀ',
    'home.fast.desc': '30 ਮਿੰਟ ਵਿੱਚ ਆਪਣੇ ਘਰ ਦਵਾਈਆਂ ਦੀ ਡਿਲੀਵਰੀ',
    'home.genuine.title': 'ਅਸਲੀ ਉਤਪਾਦ',
    'home.genuine.desc': 'ਲਾਇਸੈਂਸਸ਼ੁਦਾ ਫਾਰਮੇਸੀਆਂ ਤੋਂ 100% ਅਸਲੀ ਦਵਾਈਆਂ',
    'home.tracking.title': 'ਰੀਅਲ-ਟਾਈਮ ਟਰੈਕਿੰਗ',
    'home.tracking.desc': 'ਸਟੋਰ ਤੋਂ ਡਿਲੀਵਰੀ ਤੱਕ ਰੀਅਲ-ਟਾਈਮ ਵਿੱਚ ਆਪਣੇ ਆਰਡਰ ਨੂੰ ਟਰੈਕ ਕਰੋ',
    'home.urgent.title': 'ਤੁਰੰਤ ਦਵਾਈਆਂ ਚਾਹੀਦੀਆਂ ਹਨ?',
    'home.urgent.desc': 'ਫਾਰਮੇਸੀ ਦੀਆਂ ਲੰਬੀਆਂ ਕਤਾਰਾਂ ਵਿੱਚ ਨਾ ਖੜ੍ਹੇ ਹੋਵੋ। ਆਪਣੇ ਨੁਸਖੇ ਅਤੇ ਬਿਨਾਂ ਨੁਸਖੇ ਵਾਲੀਆਂ ਦਵਾਈਆਂ ਜਲਦੀ ਮੰਗਵਾਓ।',
    'home.urgent.button': 'ਹੁਣੇ ਆਰਡਰ ਕਰੋ',
    'home.telemedicine.title': 'ਟੈਲੀਮੈਡੀਸਿਨ ਸੇਵਾਵਾਂ',
    'home.telemedicine.desc': 'ਆਪਣੇ ਘਰ ਦੇ ਆਰਾਮ ਤੋਂ ਯੋਗ ਡਾਕਟਰਾਂ ਨਾਲ ਜੁੜੋ',
    'home.telemedicine.button': 'ਸਲਾਹ ਬੁੱਕ ਕਰੋ',
    'home.health_records.title': 'ਆਪਣੇ ਸਿਹਤ ਰਿਕਾਰਡ ਦਾ ਪ੍ਰਬੰਧਨ ਕਰੋ',
    'home.health_records.subtitle': 'ਆਪਣੇ ਮੈਡੀਕਲ ਇਤਿਹਾਸ, ਨੁਸਖੇ ਅਤੇ ਲੈਬ ਰਿਪੋਰਟਾਂ ਨੂੰ ਇੱਕ ਸੁਰੱਖਿਤ ਸਥਾਨ ਵਿੱਚ ਰੱਖੋ',
    'home.health_records.button': 'ਸਾਰੇ ਰਿਕਾਰਡ ਦੇਖੋ',
    
    // Common
    'common.loading': 'ਲੋਡ ਹੋ ਰਿਹਾ ਹੈ...',
    'common.error': 'ਗਲਤੀ',
    'common.success': 'ਸਫਲਤਾ',
    'common.save': 'ਸੇਵ ਕਰੋ',
    'common.cancel': 'ਰੱਦ ਕਰੋ',
    'common.continue': 'ਜਾਰੀ ਰੱਖੋ',
    'common.back': 'ਵਾਪਸ',
    'common.next': 'ਅਗਲਾ',
    'common.yes': 'ਹਾਂ',
    'common.no': 'ਨਹੀਂ',
    
    // Login/Register
    'auth.login.title': 'ਵਾਪਸ ਜੀ ਆਇਆਂ ਨੂੰ',
    'auth.login.subtitle': 'ਦਵਾਈਆਂ ਆਰਡਰ ਕਰਨ ਲਈ ਆਪਣੇ ਖਾਤੇ ਵਿੱਚ ਲਾਗਇਨ ਕਰੋ',
    'auth.register.title': 'ਖਾਤਾ ਬਣਾਓ',
    'auth.register.subtitle': 'ਤੁਰੰਤ ਦਵਾਈ ਡਿਲੀਵਰੀ ਲਈ ਮੈਡੀਸਵਿਫਟ ਵਿੱਚ ਸ਼ਾਮਲ ਹੋਵੋ',
    'auth.email': 'ਈਮੇਲ',
    'auth.password': 'ਪਾਸਵਰਡ',
    'auth.name': 'ਪੂਰਾ ਨਾਮ',
    'auth.phone': 'ਫੋਨ ਨੰਬਰ',
    'auth.login.button': 'ਲਾਗਇਨ',
    'auth.register.button': 'ਰਜਿਸਟਰ',
    'auth.switch.to.register': 'ਕੋਈ ਖਾਤਾ ਨਹੀਂ ਹੈ? ਰਜਿਸਟਰ ਕਰੋ',
    'auth.switch.to.login': 'ਪਹਿਲਾਂ ਤੋਂ ਖਾਤਾ ਹੈ? ਲਾਗਇਨ ਕਰੋ',
    'auth.forgot.password': 'ਪਾਸਵਰਡ ਭੁੱਲ ਗਏ?',
    
    // User types
    'auth.user.type': 'ਮੈਂ ਹਾਂ',
    'auth.user.patient': 'ਮਰੀਜ਼',
    'auth.user.doctor': 'ਡਾਕਟਰ',
    
    // Language
    'language.select': 'ਭਾਸ਼ਾ ਚੁਣੋ',
    'language.english': 'English',
    'language.punjabi': 'ਪੰਜਾਬੀ',
    
    // Medicine related
    'medicine.category': 'ਦਵਾਈ ਸ਼ਰੇਣੀ',
    'medicine.search.placeholder': 'ਦਵਾਈਆਂ ਖੋਜੋ...',
    'medicine.no.results': 'ਕੋਈ ਦਵਾਈ ਨਹੀਂ ਮਿਲੀ',
    'medicine.add.to.cart': 'ਕਾਰਟ ਵਿੱਚ ਪਾਓ',
    'medicine.prescription.required': 'ਨੁਸਖਾ ਲੋੜੀਂਦਾ',
    'medicine.in.stock': 'ਸਟਾਕ ਵਿੱਚ',
    'medicine.out.of.stock': 'ਸਟਾਕ ਖਤਮ',
    'medicine.price': 'ਕੀਮਤ',
    'medicine.quantity': 'ਮਾਤਰਾ',
    
    // Orders
    'order.status.pending': 'ਲੰਬਿਤ',
    'order.status.confirmed': 'ਪੁਸ਼ਟੀ ਹੋਇਆ',
    'order.status.packed': 'ਪੈਕ ਹੋਇਆ',
    'order.status.out_for_delivery': 'ਡਿਲੀਵਰੀ ਲਈ ਨਿਕਲਿਆ',
    'order.status.delivered': 'ਡਿਲੀਵਰ ਹੋਇਆ',
    'order.track': 'ਆਰਡਰ ਟਰੈਕ ਕਰੋ',
    'order.total': 'ਕੁੱਲ ਰਕਮ',
    'order.payment.mode': 'ਭੁਗਤਾਨ ਮੋਡ',
    'order.delivery.address': 'ਡਿਲੀਵਰੀ ਪਤਾ',
    
    // Health Records
    'health.records.title': 'ਡਿਜੀਟਲ ਸਿਹਤ ਰਿਕਾਰਡ',
    'health.records.add': 'ਰਿਕਾਰਡ ਜੋੜੋ',
    'health.records.view': 'ਰਿਕਾਰਡ ਦੇਖੋ',
    
    // Symptom Checker
    'symptom.checker.title': 'ਲੱਛਣ ਜਾਂਚ',
    'symptom.checker.subtitle': 'ਸਿਹਤ ਸਿਫਾਰਿਸ਼ਾਂ ਪਾਣ ਲਈ ਕੁਝ ਪ੍ਰਸ਼ਨਾਂ ਦੇ ਜਵਾਬ ਦਿਓ',
    'symptom.checker.start': 'ਮੁਲਾਂਕਣ ਸ਼ੁਰੂ ਕਰੋ',
    'symptom.checker.ai.title': 'AI-ਸੰਚਾਲਿਤ ਲੱਛਣ ਜਾਂਚ',
    'symptom.checker.ai.subtitle': 'ਆਰਟੀਫਿਸ਼ਲ ਇੰਟੈਲੀਜੈਂਸ ਦੁਆਰਾ ਸੰਚਾਲਿਤ ਸਿਹਤ ਸੂਝ ਪ੍ਰਾਪਤ ਕਰੋ',
    'symptom.checker.enter.info': 'ਆਪਣੀ ਜਾਣਕਾਰੀ ਦਰਜ ਕਰੋ',
    'symptom.checker.form.subtitle': 'AI-ਸੰਚਾਲਿਤ ਵਿਸ਼ਲੇਸ਼ਣ ਲਈ ਆਪਣੇ ਵੇਰਵੇ ਅਤੇ ਲੱਛਣ ਪ੍ਰਦਾਨ ਕਰੋ',
    'symptom.checker.age': 'ਉਮਰ',
    'symptom.checker.age.placeholder': 'ਆਪਣੀ ਉਮਰ ਦਰਜ ਕਰੋ',
    'symptom.checker.gender': 'ਲਿੰਗ',
    'symptom.checker.gender.male': 'ਮਰਦ',
    'symptom.checker.gender.female': 'ਔਰਤ',
    'symptom.checker.gender.other': 'ਹੋਰ',
    'symptom.checker.gender.prefer.not.to.say': 'ਕਹਿਣਾ ਨਹੀਂ ਚਾਹੁੰਦਾ',
    'symptom.checker.symptoms': 'ਲੱਛਣ',
    'symptom.checker.symptoms.placeholder': 'ਆਪਣੇ ਲੱਛਣਾਂ ਦਾ ਵਿਸਤਾਰ ਨਾਲ ਵਰਣਨ ਕਰੋ। ਇਹ ਸ਼ਾਮਲ ਕਰੋ ਕਿ ਉਹ ਕਦੋਂ ਸ਼ੁਰੂ ਹੋਏ, ਗੰਭੀਰਤਾ, ਕੀ ਇਹਨਾਂ ਨੂੰ ਬਿਹਤਰ ਜਾਂ ਮਾੜਾ ਬਣਾਉਂਦਾ ਹੈ, ਅਤੇ ਕੋਈ ਹੋਰ ਸੰਬੰਧਿਤ ਜਾਣਕਾਰੀ...',
    'symptom.checker.analyze': 'ਲੱਛਣਾਂ ਦਾ ਵਿਸ਼ਲੇਸ਼ਣ ਕਰੋ',
    'symptom.checker.analyzing': 'ਵਿਸ਼ਲੇਸ਼ਣ ਕੀਤਾ ਜਾ ਰਿਹਾ ਹੈ...',
    'symptom.checker.assessment.complete': 'AI ਮੁਲਾਂਕਣ ਮੁਕੰਮਲ',
    'symptom.checker.ai.recommendation': 'ਤੁਹਾਡੇ ਲੱਛਣਾਂ ਦੇ ਆਧਾਰ ਤੇ, ਇਹ ਸਾਡੀ AI-ਸੰਚਾਲਿਤ ਸਿਫਾਰਿਸ਼ ਹੈ',
    'symptom.checker.possible.conditions': 'ਸੰਭਾਵਿਤ ਸਥਿਤੀਆਂ:',
    'symptom.checker.next.steps': 'ਅਗਲੇ ਕਦਮ:',
    'symptom.checker.recommended.specialist': 'ਸਿਫਾਰਿਸ਼ੀ ਸਪੈਸ਼ਲਿਸਟ:',
    'symptom.checker.book.consultation.now': 'ਹੁਣੇ ਸਲਾਹ ਬੁੱਕ ਕਰੋ',
    'symptom.checker.call.emergency': 'ਐਮਰਜੈਂਸੀ ਸੇਵਾਵਾਂ ਨੂੰ ਕਾਲ ਕਰੋ',
    'symptom.checker.new.assessment': 'ਨਵਾਂ ਮੁਲਾਂਕਣ',
    'symptom.checker.disclaimer': '⚠️ ਇਹ AI ਮੁਲਾਂਕਣ ਸਿਰਫ ਜਾਣਕਾਰੀ ਦੇ ਉਦੇਸ਼ਾਂ ਲਈ ਹੈ ਅਤੇ ਪੇਸ਼ੇਵਰ ਡਾਕਟਰੀ ਸਲਾਹ ਦੀ ਬਰਾਬਰੀ ਨਹੀਂ ਕਰਦਾ।',
    'symptom.checker.tool.disclaimer': '⚠️ ਇਹ ਟੂਲ ਸਿਰਫ ਸ਼ੁਰੂਆਤੀ ਜਾਣਕਾਰੀ ਪ੍ਰਦਾਨ ਕਰਦਾ ਹੈ ਅਤੇ ਪੇਸ਼ੇਵਰ ਡਾਕਟਰੀ ਸਲਾਹ ਦੀ ਬਰਾਬਰੀ ਨਹੀਂ ਕਰਦਾ।',

    // Consultation
    'consultation.book': 'ਸਲਾਹ ਬੁੱਕ ਕਰੋ',
    'consultation.video.call': 'ਵੀਡੀਓ ਸਲਾਹ',
    'consultation.doctor.available': 'ਹੁਣ ਉਪਲਬਧ',
    'consultation.fee': 'ਸਲਾਹ ਫੀਸ',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations[typeof language]] || key;
  };

  const value = {
    language,
    setLanguage,
    t
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};