import { supabase } from '@/lib/supabase';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export async function getIndices() {
    const res = await fetch(`${API_URL}/market/indices`);
    if (!res.ok) throw new Error('Failed to fetch indices');
    return res.json();
}

export async function getTopMovers() {
    const res = await fetch(`${API_URL}/market/movers`);
    if (!res.ok) throw new Error('Failed to fetch movers');
    return res.json();
}

export async function getHoldings() {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) throw new Error('No session');

    const res = await fetch(`${API_URL}/portfolio`, {
        headers: {
            Authorization: session.access_token,
        },
    });
    if (!res.ok) throw new Error('Failed to fetch holdings');
    return res.json();
}
