import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useProfile } from "@/lib/useProfile";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, ClipboardList, FileText, Stethoscope } from "lucide-react";
import { Link } from "react-router-dom";


export default function Dashboard() {
    const { profile, loading } = useProfile();
    const displayName = profile?.full_name || "User";

    const [apptCount, setApptCount] = useState<number>(0);
    const [rxCount, setRxCount] = useState<number>(0);
    const [ordersCount, setOrdersCount] = useState<number>(0); // if you add orders later

    useEffect(() => {
        let mounted = true;

        const loadCounts = async () => {
            // Appointments (RLS ensures we only see our own)
            const { count: aCount } = await supabase
                .from("appointments")
                .select("*", { count: "exact", head: true });
            if (mounted && typeof aCount === "number") setApptCount(aCount);

            // Prescriptions as "Health Records"
            const { count: pCount } = await supabase
                .from("prescriptions")
                .select("*", { count: "exact", head: true });
            if (mounted && typeof pCount === "number") setRxCount(pCount);

            // Orders (optional): keep 0 until you create a table
            // const { count: oCount } = await supabase.from("orders").select("*", { count: "exact", head: true });
            // if (mounted && typeof oCount === "number") setOrdersCount(oCount);
            setOrdersCount(0);
        };

        loadCounts();
        return () => { mounted = false; };
    }, []);

    if (loading) {
        return <div className="p-6 text-center">Loading…</div>;
    }

    return (
        <div className="p-4 md:p-6 space-y-6">
            {/* Welcome banner */}
            <Card className="bg-gradient-to-r from-teal-600 to-teal-400 text-white">
                <CardHeader>
                    <CardTitle className="text-2xl md:text-3xl">Welcome back, {displayName}! 👋</CardTitle>
                    <CardDescription className="text-white/90">
                        Here’s your health dashboard overview
                    </CardDescription>
                </CardHeader>
            </Card>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <StatCard title="Upcoming Appointments" value={apptCount} icon={<Calendar className="h-5 w-5" />} />
                <StatCard title="Recent Orders" value={ordersCount} icon={<ClipboardList className="h-5 w-5" />} />
                <StatCard title="Health Records" value={rxCount} icon={<FileText className="h-5 w-5" />} />
            </div>

            {/* Quick actions */}
            <Card>
                <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                    <CardDescription>Access frequently used services</CardDescription>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <QuickAction
                        title="Consultation"
                        desc="Book video consultation with doctors"
                        to="/consultation"
                        icon={<Stethoscope className="h-4 w-4" />}
                    />
                    <QuickAction
                        title="Symptom Checker"
                        desc="Check your symptoms and get recommendations"
                        to="/symptom-checker"
                        icon={<FileText className="h-4 w-4" />}
                    />
                    <QuickAction
                        title="Medicines"
                        desc="Browse and order medicines"
                        to="/medicines"
                        icon={<ClipboardList className="h-4 w-4" />}
                    />
                    <QuickAction
                        title="Health Records"
                        desc="View your digital health records"
                        to="/records"
                        icon={<FileText className="h-4 w-4" />}
                    />
                </CardContent>
            </Card>
        </div>
    );
}

function StatCard({ title, value, icon }: { title: string; value: number; icon?: React.ReactNode }) {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-base font-medium">{title}</CardTitle>
                {icon}
            </CardHeader>
            <CardContent>
                <div className="text-3xl font-bold">{value}</div>
            </CardContent>
        </Card>
    );
}

function QuickAction({ title, desc, to, icon }: { title: string; desc: string; to: string; icon?: React.ReactNode }) {
    return (
        <div className="flex items-center justify-between rounded-lg border p-4">
            <div>
                <div className="font-medium">{title}</div>
                <div className="text-sm text-muted-foreground">{desc}</div>
            </div>
            <Button asChild>
                <Link to={to} className="inline-flex items-center gap-2">
                    {icon}
                    Open
                </Link>
            </Button>
        </div>
    );
}
