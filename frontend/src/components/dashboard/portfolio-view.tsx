'use client';

import { motion } from 'framer-motion';
import { ArrowUp, ArrowDown, Wallet, PieChart as PieIcon } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { cn } from '@/lib/utils';

interface Holding {
    id: number;
    ticker: string;
    quantity: number;
    average_price: number;
    live_price: number;
    current_value: number;
    pnl: number;
    pnl_percent: number;
}

export default function PortfolioView({ holdings }: { holdings: Holding[] }) {
    const totalValue = holdings.reduce((acc, h) => acc + h.current_value, 0);
    const totalInvested = holdings.reduce((acc, h) => acc + (h.average_price * h.quantity), 0);
    const totalPnL = totalValue - totalInvested;
    const totalPnLPercent = totalInvested > 0 ? (totalPnL / totalInvested) * 100 : 0;

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.1 },
        },
    };

    const item = {
        hidden: { y: 20, opacity: 0 },
        show: { y: 0, opacity: 1 },
    };

    // Safe color palette for chart
    const COLORS = ['#6366f1', '#10b981', '#f59e0b', '#ec4899', '#8b5cf6', '#06b6d4'];

    return (
        <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="space-y-8"
        >
            {/* Summary Cards */}
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                <motion.div variants={item} className="rounded-2xl border border-white/10 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 p-6 backdrop-blur-md">
                    <div className="flex items-center gap-4">
                        <div className="rounded-full bg-indigo-500/20 p-3 text-indigo-500">
                            <Wallet className="h-6 w-6" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-muted-foreground">Portfolio Value</p>
                            <h3 className="text-2xl font-bold">₹{totalValue.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</h3>
                        </div>
                    </div>
                </motion.div>

                <motion.div variants={item} className="rounded-2xl border border-white/10 bg-gradient-to-br from-emerald-500/10 to-teal-500/10 p-6 backdrop-blur-md">
                    <div className="flex items-center gap-4">
                        <div className="rounded-full bg-emerald-500/20 p-3 text-emerald-500">
                            <PieIcon className="h-6 w-6" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-muted-foreground">Total P&L</p>
                            <div className="flex items-baseline gap-2">
                                <h3 className={cn("text-2xl font-bold", totalPnL >= 0 ? "text-emerald-500" : "text-red-500")}>
                                    {totalPnL >= 0 ? '+' : ''}₹{Math.abs(totalPnL).toLocaleString('en-IN', { maximumFractionDigits: 2 })}
                                </h3>
                                <span className={cn("text-sm font-medium", totalPnL >= 0 ? "text-emerald-500" : "text-red-500")}>
                                    ({totalPnLPercent.toFixed(2)}%)
                                </span>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>

            <div className="grid gap-8 lg:grid-cols-3">
                {/* Chart Section */}
                <motion.div variants={item} className="rounded-2xl border border-white/10 bg-black/40 backdrop-blur-xl p-6 lg:col-span-1">
                    <h3 className="mb-6 text-lg font-semibold">Allocation</h3>
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={holdings}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={80}
                                    paddingAngle={5}
                                    dataKey="current_value"
                                    nameKey="ticker"
                                    stroke="none"
                                >
                                    {holdings.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#18181b', borderColor: '#27272a', borderRadius: '8px', color: '#fff' }}
                                    itemStyle={{ color: '#fff' }}
                                    formatter={(value: number | undefined) => `₹${(value || 0).toLocaleString()}`}
                                />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </motion.div>

                {/* Holdings List */}
                <motion.div variants={item} className="rounded-2xl border border-white/10 bg-black/40 backdrop-blur-xl lg:col-span-2">
                    <div className="p-6">
                        <h2 className="text-xl font-bold">Your Holdings</h2>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm">
                            <thead className="border-b border-white/10 bg-white/5 text-muted-foreground">
                                <tr>
                                    <th className="px-6 py-3 font-medium">Ticker</th>
                                    <th className="px-6 py-3 font-medium text-right">Qty</th>
                                    <th className="px-6 py-3 font-medium text-right">Avg Price</th>
                                    <th className="px-6 py-3 font-medium text-right">LTP</th>
                                    <th className="px-6 py-3 font-medium text-right">Value</th>
                                    <th className="px-6 py-3 font-medium text-right">P&L</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {holdings.map((holding) => (
                                    <tr key={holding.id} className="group transition-colors hover:bg-white/5">
                                        <td className="px-6 py-4 font-semibold">{holding.ticker}</td>
                                        <td className="px-6 py-4 text-right text-muted-foreground">{holding.quantity}</td>
                                        <td className="px-6 py-4 text-right text-muted-foreground">₹{holding.average_price.toFixed(2)}</td>
                                        <td className="px-6 py-4 text-right font-medium">₹{holding.live_price.toFixed(2)}</td>
                                        <td className="px-6 py-4 text-right font-medium">₹{holding.current_value.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</td>
                                        <td className="px-6 py-4 text-right">
                                            <div className={cn("flex items-center justify-end gap-1 font-medium",
                                                holding.pnl >= 0 ? "text-emerald-500" : "text-red-500"
                                            )}>
                                                {holding.pnl >= 0 ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />}
                                                {Math.abs(holding.pnl).toLocaleString('en-IN', { maximumFractionDigits: 2 })}
                                                <span className="text-xs opacity-80">({holding.pnl_percent.toFixed(2)}%)</span>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </motion.div>
            </div>
        </motion.div>
    );
}
