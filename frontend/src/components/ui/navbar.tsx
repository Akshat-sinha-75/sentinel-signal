'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { Activity, LayoutDashboard, PieChart, LogOut, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

export default function Navbar() {
    const pathname = usePathname();
    const router = useRouter();

    const handleLogout = async () => {
        await supabase.auth.signOut();
        router.push('/login');
    };

    const navItems = [
        { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
        { name: 'Market', href: '/market', icon: Activity },
        { name: 'Portfolio', href: '/portfolio', icon: PieChart },
    ];

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-background/60 backdrop-blur-xl">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                            <Activity className="h-5 w-5" />
                        </div>
                        <span className="text-lg font-bold tracking-tight text-foreground">
                            Sentinel Signal
                        </span>
                    </div>

                    <div className="hidden md:block">
                        <div className="flex items-center space-x-4">
                            {navItems.map((item) => {
                                const isActive = pathname === item.href;
                                const Icon = item.icon;
                                return (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        className={cn(
                                            'group relative flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:text-foreground',
                                            isActive ? 'text-foreground' : 'text-muted-foreground'
                                        )}
                                    >
                                        {isActive && (
                                            <motion.div
                                                layoutId="navbar-indicator"
                                                className="absolute inset-0 rounded-md bg-secondary"
                                                transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                                            />
                                        )}
                                        <span className="relative z-10 flex items-center gap-2">
                                            <Icon className="h-4 w-4" />
                                            {item.name}
                                        </span>
                                    </Link>
                                );
                            })}
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-2 rounded-full border border-white/10 bg-secondary/50 px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
                        >
                            <LogOut className="h-4 w-4" />
                            <span className="hidden sm:inline">Logout</span>
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
}
