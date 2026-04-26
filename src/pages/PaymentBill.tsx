import { useMemo } from "react";
import { useProfile } from "@/lib/useProfile";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

type BillItem = {
    name: string;
    qty: number;
    price: number; // per unit
};

export default function PaymentBill() {
    const { profile } = useProfile();
    const customerName = profile?.full_name || "Customer";

    // If you have a cart/order state, replace this with real data:
    const items: BillItem[] = [
        // example structure (empty by default)
        // { name: "Paracetamol 500mg", qty: 2, price: 25 },
    ];

    const totals = useMemo(() => {
        const subtotal = items.reduce((s, it) => s + it.qty * it.price, 0);
        const tax = Math.round(subtotal * 0.05 * 100) / 100; // 5% example
        const total = Math.round((subtotal + tax) * 100) / 100;
        return { subtotal, tax, total };
    }, [items]);

    return (
        <div className="p-4 md:p-6 space-y-6">
            <Card>
                <CardHeader className="flex items-center justify-between">
                    <CardTitle>Invoice</CardTitle>
                    <Button
                        variant="outline"
                        onClick={() => window.print()}
                        className="print:hidden"
                    >
                        Print
                    </Button>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        <div>
                            <div className="font-medium">Billed To</div>
                            <div className="text-sm text-muted-foreground">{customerName}</div>
                            {/* Add phone/email if you store them */}
                        </div>
                        <div className="md:text-right">
                            <div className="font-medium">MediSwift</div>
                            <div className="text-sm text-muted-foreground">Telemedicine Platform</div>
                            <div className="text-sm text-muted-foreground">Date: {new Date().toLocaleDateString()}</div>
                        </div>
                    </div>

                    <Separator />

                    <div className="w-full overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead className="text-left">
                            <tr className="border-b">
                                <th className="py-2 pr-4">Item</th>
                                <th className="py-2 pr-4">Qty</th>
                                <th className="py-2 pr-4">Price</th>
                                <th className="py-2 text-right">Amount</th>
                            </tr>
                            </thead>
                            <tbody>
                            {items.length === 0 && (
                                <tr>
                                    <td className="py-3 text-muted-foreground" colSpan={4}>
                                        No items in this bill.
                                    </td>
                                </tr>
                            )}
                            {items.map((it, idx) => (
                                <tr key={idx} className="border-b">
                                    <td className="py-2 pr-4">{it.name}</td>
                                    <td className="py-2 pr-4">{it.qty}</td>
                                    <td className="py-2 pr-4">₹ {it.price.toFixed(2)}</td>
                                    <td className="py-2 text-right">₹ {(it.qty * it.price).toFixed(2)}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="ml-auto w-full md:w-80 space-y-1">
                        <div className="flex items-center justify-between">
                            <span className="text-sm">Subtotal</span>
                            <span className="text-sm">₹ {totals.subtotal.toFixed(2)}</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-sm">Tax (5%)</span>
                            <span className="text-sm">₹ {totals.tax.toFixed(2)}</span>
                        </div>
                        <Separator className="my-2" />
                        <div className="flex items-center justify-between font-medium">
                            <span>Total</span>
                            <span>₹ {totals.total.toFixed(2)}</span>
                        </div>
                    </div>

                    <div className="text-xs text-muted-foreground">
                        Thank you for choosing GrameenSehat.
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
