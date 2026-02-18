'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { getHoldings } from '@/lib/api';
import Navbar from '@/components/ui/navbar';
import MarketOverview from '@/components/dashboard/market-overview';
import PortfolioView from '@/components/dashboard/portfolio-view';
import { Loader2 } from 'lucide-react';

export default function DashboardPage() {
    const router = useRouter();
    const [user, setUser] = useState<any>(null);
    const [authLoading, setAuthLoading] = useState(true);

    useEffect(() => {
        const checkUser = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            if (!session) {
                router.push('/login');
            } else {
                setUser(session.user);
            }
            setAuthLoading(false);
        };
        checkUser();
    }, [router]);

    const { data: holdings, isLoading: holdingsLoading } = useQuery({
        queryKey: ['holdings'],
        queryFn: getHoldings,
        enabled: !!user,
        refetchInterval: 2000,
    });

    if (authLoading || (!!user && holdingsLoading)) {
        return (
            <div className="flex h-screen items-center justify-center bg-background">
                <Loader2 className="h-10 w-10 animate-spin text-primary" />
            </div>
        );
    }

    if (!user) return null;

    const hasHoldings = holdings && holdings.length > 0;

    return (
        <div className="min-h-screen bg-background pb-12 pt-24 text-foreground">
            <Navbar />

            <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold tracking-tight">
                        Welcome back, <span className="text-indigo-500">{user.email?.split('@')[0]}</span>
                    </h1>
                    <p className="mt-2 text-muted-foreground">
                        {hasHoldings
                            ? "Here's your portfolio performance for today."
                            : "You don't have any holdings yet. Here's what's moving in the market."
                        }
                    </p>
                </div>

                {/* Always show Market Overview if no holdings, or if user wants? 
            For now, showing Portfolio if exists, else Market Overview. 
            Actually, let's show Market Top Level stats always? 
            Let's stick to the prompt's condition rigidly for the main view.
        */}

                {hasHoldings ? (
                    <div className="space-y-12">
                        <PortfolioView holdings={holdings} />
                        {/* Optional: Show Market Overview below portfolio */}
                        <div>
                            <h2 className="mb-6 text-2xl font-bold">Market Overview</h2>
                            <MarketOverview />
                        </div>
                    </div>
                ) : (
                    <MarketOverview />
                )}
            </main>
        </div>
    );
}
