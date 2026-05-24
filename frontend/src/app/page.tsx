'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Activity, ArrowRight, BarChart2, Shield } from 'lucide-react';
import Navbar from '@/components/ui/navbar';

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden selection:bg-indigo-500/30">

      {/* Background Gradients */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 h-[500px] w-[500px] bg-indigo-600/20 rounded-full blur-[120px] mix-blend-screen" />
        <div className="absolute bottom-0 right-1/4 h-[500px] w-[500px] bg-emerald-600/10 rounded-full blur-[120px] mix-blend-screen" />
      </div>

      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Simple Header */}
        <header className="px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-primary text-primary-foreground p-2 rounded-lg">
              <Activity size={20} />
            </div>
            <span className="font-bold text-xl tracking-tight">Sentinel Signal</span>
          </div>
          <Link
            href="/login"
            className="text-sm font-medium hover:text-indigo-400 transition-colors"
          >
            Sign In
          </Link>
        </header>

       

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link href="/dashboard">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="group relative px-8 py-4 bg-indigo-600 hover:bg-indigo-500 rounded-full font-semibold text-white transition-all shadow-lg shadow-indigo-500/25 flex items-center gap-2"
                >
                  Get Started
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </Link>

              <Link href="/market">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 rounded-full font-semibold text-foreground border border-white/10 hover:bg-white/5 transition-all flex items-center gap-2"
                >
                  <BarChart2 className="w-4 h-4" />
                  View Market
                </motion.button>
              </Link>
            </div>
          </motion.div>

              { icon: Activity, title: 'Real-time Data', desc: 'Live updates for NIFTY, SENSEX, and top market movers.' },
              { icon: Shield, title: 'Secure Portfolio', desc: 'Bank-grade encryption for your holdings and personal data.' },
              { icon: BarChart2, title: 'Advanced Analytics', desc: 'Interactive charts and P&L breakdowns for deeper insights.' },
            ].map((feature, i) => (
              <div key={i} className="p-6 rounded-2xl border border-white/5 bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-colors">
                <div className="h-10 w-10 rounded-lg bg-indigo-500/20 flex items-center justify-center mb-4 text-indigo-400">
                  <feature.icon size={20} />
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.desc}</p>
              </div>
            ))}
          </motion.div>
        </main>

        <footer className="py-8 text-center text-sm text-muted-foreground">
          <p>© 2026 Sentinel Signal. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
}
