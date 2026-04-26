import { useEffect, useState } from "react";
import { supabase } from "./supabaseClient"; // <- changed from "@/lib/supabaseClient"

type Profile = {
    id: string;
    full_name: string | null;
    user_type: "patient" | "doctor" | "pharmacy" | "admin" | null;
};

export function useProfile() {
    const [profile, setProfile] = useState<Profile | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let mounted = true;
        (async () => {
            const { data: session } = await supabase.auth.getSession();
            const uid = session.session?.user?.id;
            if (!uid) { setProfile(null); setLoading(false); return; }

            const { data, error } = await supabase
                .from("profiles")
                .select("id, full_name, user_type")
                .eq("id", uid)
                .single();

            if (!mounted) return;
            if (!error) setProfile(data as Profile);
            setLoading(false);
        })();
        return () => { mounted = false; };
    }, []);

    return { profile, loading };
}
