'use client';

import { useQuery } from '@tanstack/react-query';
import { getIndices, getTopMovers } from '@/lib/api';
import { motion } from 'framer-motion';
import { ArrowUp, ArrowDown, TrendingUp, TrendingDown, Activity } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function MarketOverview() {
    const { data: indices, isLoading: indicesLoading } = useQuery({
        queryKey: ['indices'],
        queryFn: getIndices,
        refetchInterval: 2000,
    });

    const { data: movers, isLoading: moversLoading } = useQuery({
        queryKey: ['movers'],
        queryFn: getTopMovers,
        refetchInterval: 2000,
    });

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
    };

    const item = {
        hidden: { y: 20, opacity: 0 },
        show: { y: 0, opacity: 1 },
    };

    if (indicesLoading || moversLoading) {
        return (
            <div className="flex h-96 items-center justify-center">
                <Activity className="h-8 w-8 animate-pulse text-indigo-500" />
            </div>
        );
    }

    return (
        <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="space-y-8"
        >
            {/* Indices Section */}
            <section>
                <h2 className="mb-4 text-2xl font-bold tracking-tight">Market Indices</h2>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {indices?.map((index: any) => (
                        <motion.div
                            key={index.symbol}
                            variants={item}
                            className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md transition-all hover:border-white/20 hover:bg-white/10"
                        >
                            <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-gradient-to-br from-white/5 to-transparent blur-2xl transition-all group-hover:from-white/10" />

                            <div className="flex items-start justify-between">
                                <div>
                                    <h3 className="text-sm font-medium text-muted-foreground">
                                        {index.symbol === '^NSEI' ? 'NIFTY 50' :
                                            index.symbol === '^BSESN' ? 'SENSEX' :
                                                index.symbol === '^NSEBANK' ? 'BANK NIFTY' : index.symbol}
                                    </h3>
                                    <div className="mt-2 flex items-baseline gap-2">
                                        <span className="text-3xl font-bold tracking-tight">
                                            {index.price.toLocaleString('en-IN', { maximumFractionDigits: 2 })}
                                        </span>
                                    </div>
                                </div>
                                <div
                                    className={cn(
                                        'flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium',
                                        index.change >= 0
                                            ? 'bg-emerald-500/10 text-emerald-500'
                                            : 'bg-red-500/10 text-red-500'
                                    )}
                                >
                                    {index.change >= 0 ? (
                                        <ArrowUp className="h-3 w-3" />
                                    ) : (
                                        <ArrowDown className="h-3 w-3" />
                                    )}
                                    {Math.abs(index.changePercent).toFixed(2)}%
                                </div>
                            </div>

                            <div className="mt-4 h-1 w-full rounded-full bg-white/5">
                                <div
                                    className={cn("h-full rounded-full transition-all duration-1000",
                                        index.change >= 0 ? "bg-emerald-500" : "bg-red-500"
                                    )}
                                    style={{ width: `${Math.min(Math.abs(index.changePercent) * 20, 100)}%` }}
                                />
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Movers Section */}
            <div className="grid gap-8 lg:grid-cols-2">
                {/* Top Gainers */}
                <section>
                    <div className="mb-4 flex items-center gap-2">
                        <TrendingUp className="h-5 w-5 text-emerald-500" />
                        <h2 className="text-xl font-bold">Top Gainers</h2>
                    </div>
                    <motion.div
                        variants={container}
                        className="rounded-2xl border border-white/10 bg-black/40 backdrop-blur-xl"
                    >
                        {movers?.gainers.map((stock: any, i: number) => (
                            <motion.div
                                key={stock.symbol}
                                variants={item}
                                className="flex items-center justify-between border-b border-white/5 p-4 last:border-0 hover:bg-white/5"
                            >
                                <div>
                                    <p className="font-semibold">{stock.symbol}</p>
                                    <p className="text-xs text-muted-foreground">{stock.name}</p>
                                </div>
                                <div className="text-right">
                                    <p className="font-medium">₹{stock.price.toFixed(2)}</p>
                                    <p className="text-sm font-medium text-emerald-500">
                                        +{stock.changePercent.toFixed(2)}%
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </section>

                {/* Top Losers */}
                <section>
                    <div className="mb-4 flex items-center gap-2">
                        <TrendingDown className="h-5 w-5 text-red-500" />
                        <h2 className="text-xl font-bold">Top Losers</h2>
                    </div>
                    <motion.div
                        variants={container}
                        className="rounded-2xl border border-white/10 bg-black/40 backdrop-blur-xl"
                    >
                        {movers?.losers.map((stock: any, i: number) => (
                            <motion.div
                                key={stock.symbol}
                                variants={item}
                                className="flex items-center justify-between border-b border-white/5 p-4 last:border-0 hover:bg-white/5"
                            >
                                <div>
                                    <p className="font-semibold">{stock.symbol}</p>
                                    <p className="text-xs text-muted-foreground">{stock.name}</p>
                                </div>
                                <div className="text-right">
                                    <p className="font-medium">₹{stock.price.toFixed(2)}</p>
                                    <p className="text-sm font-medium text-red-500">
                                        {stock.changePercent.toFixed(2)}%
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </section>
            </div>
        </motion.div>
    );
}
