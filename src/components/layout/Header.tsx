// src/components/Header.tsx
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LanguageSwitcher } from "@/components/ui/language-switcher";
import { useLanguage } from "@/contexts/LanguageContext";
import {
    Home,
    Pill,
    ShoppingBag,
    ShoppingCart,
    LogIn,
    User,
    Video,
    FileText,
    Stethoscope,
} from "lucide-react";
import { cn } from "@/lib/utils";

// If your project has the @ alias configured (it looks like it does), keep these:
import { useProfile } from "@/lib/useProfile";
import { useSupabaseUser } from "@/lib/useSupabaseUser";
import UserMenu from "@/components/UserMenu";

export const Header: React.FC = () => {
    const { t } = useLanguage();
    const location = useLocation();

    // Auth state
    const { user } = useSupabaseUser();
    const { profile } = useProfile();
    const displayName = profile?.full_name || user?.email || "User";
    const isLoggedIn = !!user;

    const isActive = (path: string) => location.pathname === path;

    const navigationItems = [
        { path: "/", label: t("nav.home"), icon: Home },
        { path: "/medicines", label: t("nav.medicines"), icon: Pill },
        { path: "/symptom-checker", label: t("nav.symptom_checker"), icon: Stethoscope },
    ];

    const loggedInItems = [
        { path: "/consultation", label: t("nav.consultation"), icon: Video },
        { path: "/health-records", label: t("nav.health_records"), icon: FileText },
    ];

    return (
        <header className="bg-gradient-to-r from-primary to-primary-dark shadow-medical sticky top-0 z-50">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link to="/" className="flex items-center space-x-4">
                        <img
                            src="/logo.png"  // place your logo file inside the public folder
                            alt="GrameenSehat Logo"
                            className="w-14 h-14 object-contain"
                        />
                        <span className="text-xl font-bold text-primary-foreground">
    GrameenSehat
  </span>
                    </Link>


                    {/* Navigation - Desktop */}
                    <nav className="hidden lg:flex items-center space-x-1">
                        {navigationItems.map((item) => {
                            const Icon = item.icon;
                            return (
                                <Link key={item.path} to={item.path}>
                                    <Button
                                        variant="ghost"
                                        className={cn(
                                            "text-primary-foreground hover:bg-primary-light/20",
                                            isActive(item.path) && "bg-primary-light/30"
                                        )}
                                    >
                                        <Icon className="w-4 h-4 mr-2" />
                                        {item.label}
                                    </Button>
                                </Link>
                            );
                        })}

                        {isLoggedIn &&
                            loggedInItems.map((item) => {
                                const Icon = item.icon;
                                return (
                                    <Link key={item.path} to={item.path}>
                                        <Button
                                            variant="ghost"
                                            className={cn(
                                                "text-primary-foreground hover:bg-primary-light/20",
                                                isActive(item.path) && "bg-primary-light/30"
                                            )}
                                        >
                                            <Icon className="w-4 h-4 mr-2" />
                                            {item.label}
                                        </Button>
                                    </Link>
                                );
                            })}
                    </nav>

                    {/* Right side actions */}
                    <div className="flex items-center space-x-2">
                        <LanguageSwitcher />

                        {isLoggedIn ? (
                            <UserMenu displayName={displayName} />
                        ) : (
                            <Link to="/auth">
                                <Button variant="secondary" size="sm">
                                    <LogIn className="w-4 h-4 mr-2" />
                                    {t("nav.login")}

                                </Button>
                            </Link>
                        )}
                    </div>
                </div>

                {/* Mobile Navigation */}
                <div className="lg:hidden pb-3">
                    <div className="flex items-center justify-between">
                        <div className="flex space-x-1 overflow-x-auto">
                            {navigationItems.map((item) => {
                                const Icon = item.icon;
                                return (
                                    <Link key={item.path} to={item.path}>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className={cn(
                                                "text-primary-foreground hover:bg-primary-light/20 flex-shrink-0",
                                                isActive(item.path) && "bg-primary-light/30"
                                            )}
                                        >
                                            <Icon className="w-4 h-4" />
                                        </Button>
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
