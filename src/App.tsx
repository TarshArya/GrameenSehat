import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { Layout } from "@/components/layout/Layout";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Medicines from "./pages/Medicines";
import Orders from "./pages/Orders";
import Cart from "./pages/Cart";
import Dashboard from "./pages/Dashboard";
import Consultation from "./pages/Consultation";
import HealthRecords from "./pages/HealthRecords";
import SymptomChecker from "./pages/SymptomChecker";
import OrderTracking from "./pages/OrderTracking";
import PaymentBill from "./pages/PaymentBill";
import NotFound from "./pages/NotFound";
import { useProfile } from "src/lib/useProfile";
import { useSupabaseUser } from "src/lib/useSupabaseUser";
import UserMenu from "src/components/UserMenu";
import { Link } from "react-router-dom";


const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/medicines" element={<Medicines />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/consultation" element={<Consultation />} />
            <Route path="/health-records" element={<HealthRecords />} />
            <Route path="/symptom-checker" element={<SymptomChecker />} />
            <Route path="/order-tracking/:id" element={<OrderTracking />} />
            <Route path="/payment-bill/:id" element={<PaymentBill />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
