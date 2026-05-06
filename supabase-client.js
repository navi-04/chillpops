import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.8';

const STORAGE_KEY = 'chillpops.supabase.config';
const DEFAULT_SUPABASE_URL = 'https://bpvhvspdreulvdcxsyav.supabase.co';

let cachedClient = null;
let cachedSignature = '';

function parseJSON(value) {
    if (!value) return null;

    try {
        return JSON.parse(value);
    } catch {
        return null;
    }
}

export function getSupabaseConfig() {
    if (typeof window === 'undefined') {
        return { url: DEFAULT_SUPABASE_URL, anonKey: '' };
    }

    const stored = parseJSON(window.localStorage.getItem(STORAGE_KEY));
    return {
        url: stored?.url || DEFAULT_SUPABASE_URL,
        anonKey: stored?.anonKey || ''
    };
}

export function saveSupabaseConfig(config) {
    if (typeof window === 'undefined') return;

    const nextConfig = {
        url: (config?.url || DEFAULT_SUPABASE_URL).trim(),
        anonKey: (config?.anonKey || '').trim()
    };

    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(nextConfig));
    cachedClient = null;
    cachedSignature = '';
}

export function clearSupabaseConfig() {
    if (typeof window === 'undefined') return;

    window.localStorage.removeItem(STORAGE_KEY);
    cachedClient = null;
    cachedSignature = '';
}

export function hasSupabaseConfig() {
    const { url, anonKey } = getSupabaseConfig();
    return Boolean(url && anonKey);
}

export function getSupabaseClient() {
    const { url, anonKey } = getSupabaseConfig();

    if (!url || !anonKey) return null;

    const signature = `${url}::${anonKey}`;
    if (cachedClient && signature === cachedSignature) {
        return cachedClient;
    }

    cachedClient = createClient(url, anonKey, {
        auth: {
            persistSession: true,
            autoRefreshToken: true,
            detectSessionInUrl: true
        }
    });
    cachedSignature = signature;

    return cachedClient;
}
