'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Activity, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const { error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (error) throw error;
            router.push('/dashboard');
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleSignUp = async () => {
        setLoading(true);
        setError(null);
        try {
            const { error } = await supabase.auth.signUp({
                email,
                password,
            });
            if (error) throw error;
            alert('Check your email for the confirmation link!');
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-background px-4">
            {/* Background Ambience */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -left-[10%] top-[20%] h-[500px] w-[500px] rounded-full bg-indigo-500/10 blur-[100px]" />
                <div className="absolute -right-[10%] bottom-[20%] h-[500px] w-[500px] rounded-full bg-emerald-500/10 blur-[100px]" />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative w-full max-w-md overflow-hidden rounded-2xl border border-white/10 bg-black/40 backdrop-blur-xl p-8 shadow-2xl"
            >
                <div className="mb-8 flex flex-col items-center text-center">
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary shadow-lg shadow-primary/20">
                        <Activity className="h-6 w-6 text-primary-foreground" />
                    </div>
                    <h1 className="text-3xl font-bold tracking-tight text-foreground">
                        Sentinel Signal
                    </h1>
                    <p className="mt-2 text-sm text-muted-foreground">
                        Sign in to access your portfolio and market insights
                    </p>
                </div>

                <form onSubmit={handleLogin} className="space-y-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-foreground">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-foreground placeholder-white/20 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                            placeholder="name@example.com"
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-foreground">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-foreground placeholder-white/20 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                            placeholder="••••••••"
                            required
                        />
                    </div>

                    {error && (
                        <div className="rounded-lg bg-red-500/10 p-3 text-sm text-red-500">
                            {error}
                        </div>
                    )}

                    <div className="pt-4 space-y-3">
                        <button
                            type="submit"
                            disabled={loading}
                            className="flex w-full items-center justify-center rounded-lg bg-indigo-600 py-2.5 text-sm font-semibold text-white transition-all hover:bg-indigo-500 disabled:opacity-50"
                        >
                            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Sign In'}
                        </button>
                        <button
                            type="button"
                            onClick={handleSignUp}
                            disabled={loading}
                            className="flex w-full items-center justify-center rounded-lg border border-white/10 bg-white/5 py-2.5 text-sm font-semibold text-foreground transition-all hover:bg-white/10 disabled:opacity-50"
                        >
                            Create Account
                        </button>
                    </div>
                </form>
            </motion.div>
        </div>
    );
}
