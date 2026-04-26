// src/pages/Consultation.tsx
import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { mockDoctors } from "@/data/mockdata";
import type { Doctor } from "@/types";
import { Button } from "@/components/ui/button";
import {
    Video,
    Star,
    MapPin,
    CheckCircle2,
    XCircle,
    Languages,
    IndianRupee,
    X,
    CalendarDays,
    Clock,
} from "lucide-react";
import { cn } from "@/lib/utils";

const Badge: React.FC<{ color?: "green" | "red"; children: React.ReactNode }> = ({
                                                                                     color = "green",
                                                                                     children,
                                                                                 }) => (
    <span
        className={cn(
            "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
            color === "green" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
        )}
    >
    {children}
  </span>
);

const Card: React.FC<{ children: React.ReactNode; className?: string }> = ({
                                                                               children,
                                                                               className,
                                                                           }) => (
    <div className={cn("rounded-xl border bg-white p-4 shadow-sm", className)}>{children}</div>
);

export default function Consultation() {
    const doctors = useMemo<Doctor[]>(() => mockDoctors, []);
    const [query, setQuery] = useState("");
    const [selected, setSelected] = useState<Doctor | null>(null);

    const filtered = useMemo(() => {
        if (!query.trim()) return doctors;
        const q = query.toLowerCase();
        return doctors.filter(
            (d) =>
                d.name.toLowerCase().includes(q) ||
                d.specialization.toLowerCase().includes(q) ||
                d.languages.join(" ").toLowerCase().includes(q)
        );
    }, [doctors, query]);

    return (
        <div className="container mx-auto max-w-6xl px-4 py-6">
            {/* Header */}
            <div className="mb-6 flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-semibold tracking-tight">Book a Consultation</h1>
                    <p className="text-sm text-muted-foreground">
                        Choose a doctor and schedule a video consultation.
                    </p>
                </div>

                <Link to="/">
                    <Button variant="ghost" size="sm">← Back to Home</Button>
                </Link>
            </div>

            {/* Search */}
            <div className="mb-6">
                <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search by name, specialization, or language…"
                    className="w-full rounded-lg border px-3 py-2 outline-none focus:ring-2 focus:ring-primary/40"
                />
            </div>

            {/* Doctors Grid */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {filtered.map((d) => (
                    <Card key={d.id} className="flex flex-col h-full min-w-0 overflow-hidden">
                        <div className="mb-3 flex items-start justify-between">
                            <div>
                                <h3 className="text-lg font-semibold">{d.name}</h3>
                                <p className="text-sm text-muted-foreground">{d.specialization}</p>
                            </div>

                            <div className="text-right">
                                <div className="flex items-center justify-end text-sm">
                                    <Star className="mr-1 h-4 w-4 text-yellow-500" />
                                    <span className="font-medium">{d.rating.toFixed(1)}</span>
                                </div>
                                <div className="mt-1 text-xs text-muted-foreground">
                                    {d.experience} yrs exp.
                                </div>
                            </div>
                        </div>

                        <div className="mb-3 grid gap-2 text-sm">
                            <div className="flex items-center text-muted-foreground">
                                <Languages className="mr-2 h-4 w-4" />
                                {d.languages.join(", ")}
                            </div>
                            <div className="flex items-center text-muted-foreground">
                                <MapPin className="mr-2 h-4 w-4" />
                                Video consultation
                            </div>
                            <div className="flex items-center">
                                <IndianRupee className="mr-2 h-4 w-4" />
                                <span className="font-medium">{d.consultationFee}</span>
                            </div>
                            <div>
                                {d.available ? (
                                    <Badge color="green">
                                        <CheckCircle2 className="mr-1 h-3 w-3" />
                                        Available
                                    </Badge>
                                ) : (
                                    <Badge color="red">
                                        <XCircle className="mr-1 h-3 w-3" />
                                        Busy
                                    </Badge>
                                )}
                            </div>
                        </div>

                        <div className="mt-auto pt-2">
                            <Button
                                className="w-full"
                                onClick={() => setSelected(d)}
                                disabled={!d.available}
                            >
                                <Video className="mr-2 h-4 w-4" />
                                {d.available ? "Book Consultation" : "Currently Busy"}
                            </Button>
                        </div>
                    </Card>
                ))}
            </div>

            {/* Booking Panel (UI only) */}
            {selected && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
                    <div className="w-full max-w-md rounded-xl bg-white p-5 shadow-xl">
                        <div className="mb-4 flex items-start justify-between">
                            <div>
                                <h2 className="text-lg font-semibold">Schedule Consultation</h2>
                                <p className="text-sm text-muted-foreground">
                                    {selected.name} • {selected.specialization}
                                </p>
                            </div>
                            <button
                                className="rounded-md p-1 hover:bg-gray-100"
                                onClick={() => setSelected(null)}
                                aria-label="Close"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </div>

                        <div className="space-y-3">
                            <label className="flex items-center gap-2 text-sm">
                                <CalendarDays className="h-4 w-4 text-muted-foreground" />
                                <input
                                    type="date"
                                    className="w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary/30"
                                />
                            </label>

                            <label className="flex items-center gap-2 text-sm">
                                <Clock className="h-4 w-4 text-muted-foreground" />
                                <input
                                    type="time"
                                    className="w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary/30"
                                />
                            </label>

                            <div className="pt-1">
                                <Button className="w-full" onClick={() => setSelected(null)}>
                                    Confirm Booking
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
