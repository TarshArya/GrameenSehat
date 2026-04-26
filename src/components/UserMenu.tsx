// src/components/UserMenu.tsx
import React from "react";
import { Link } from "react-router-dom";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { User, ShoppingBag, ShoppingCart, LogOut } from "lucide-react";
import { useSupabaseUser } from "@/lib/useSupabaseUser";
import { supabase } from "@/lib/supabaseClient";

type Props = {
    displayName?: string;
};

const UserMenu: React.FC<Props> = ({ displayName = "User" }) => {
    const { user } = useSupabaseUser();

    const handleLogout = async () => {
        await supabase.auth.signOut();
        // optional: window.location.href = "/";
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="text-primary-foreground hover:bg-primary-light/20">
                    <User className="w-4 h-4 mr-2" />
                    {displayName}
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuLabel>{displayName}</DropdownMenuLabel>
                <DropdownMenuSeparator />

                <Link to="/profile">
                    <DropdownMenuItem>
                        <User className="mr-2 h-4 w-4" />
                        <span>Profile</span>
                    </DropdownMenuItem>
                </Link>

                <Link to="/orders">
                    <DropdownMenuItem>
                        <ShoppingBag className="mr-2 h-4 w-4" />
                        <span>My Orders</span>
                    </DropdownMenuItem>
                </Link>

                <Link to="/cart">
                    <DropdownMenuItem>
                        <ShoppingCart className="mr-2 h-4 w-4" />
                        <span>Cart</span>
                    </DropdownMenuItem>
                </Link>

                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default UserMenu;
