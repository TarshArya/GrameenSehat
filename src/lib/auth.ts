import { supabase } from "./supabaseClient";

export async function signUpWithEmail({
                                          email,
                                          password,
                                          name,
                                          phone,
                                          userType = "patient", // 'patient' | 'doctor' | 'pharmacy' | 'admin'
                                      }: {
    email: string;
    password: string;
    name?: string;
    phone?: string;
    userType?: "patient" | "doctor" | "pharmacy" | "admin";
}) {
    const { error } = await supabase.auth.signUp({
        email: email.trim(),
        password,
        options: {
            data: { name, phone, userType },
            // If you keep email confirmations ON, you can set a redirect (optional):
            // emailRedirectTo: `${window.location.origin}/auth`,
        },
    });
    if (error) throw error;

    // If confirmations are ON, there won't be a session yet.
    // If OFF, user will be signed in immediately.
    const { data } = await supabase.auth.getSession();
    return { session: data.session };
}

export async function signInWithEmail({
                                          email,
                                          password,
                                      }: {
    email: string;
    password: string;
}) {
    const { error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
    });
    if (error) throw error;

    const { data } = await supabase.auth.getSession();
    return { session: data.session };
}

export async function signOut() {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
}
