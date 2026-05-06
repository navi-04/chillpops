import {
    flavours as fallbackFlavours,
    franchiseFeatures as fallbackFranchiseFeatures,
    franchiseStats as fallbackFranchiseStats,
    contactInfo as fallbackContactInfo,
    franchiseLocations as fallbackFranchiseLocations
} from './data.js';
import { getSupabaseClient } from './supabase-client.js';

function buildFallbackContent() {
    return {
        flavours: JSON.parse(JSON.stringify(fallbackFlavours)),
        franchiseFeatures: JSON.parse(JSON.stringify(fallbackFranchiseFeatures)),
        franchiseStats: JSON.parse(JSON.stringify(fallbackFranchiseStats)),
        contactInfo: JSON.parse(JSON.stringify(fallbackContactInfo)),
        franchiseLocations: JSON.parse(JSON.stringify(fallbackFranchiseLocations)),
        source: 'fallback',
        warnings: []
    };
}

function asArray(value, fallback) {
    return Array.isArray(value) ? value : fallback;
}

function asObject(value, fallback) {
    return value && typeof value === 'object' && !Array.isArray(value) ? value : fallback;
}

function normalizeMenu(menuItems) {
    if (!Array.isArray(menuItems) || !menuItems.length) return [];

    return menuItems.map((item, index) => ({
        id: item.id || index + 1,
        name: item.name || 'Untitled',
        description: item.description || '',
        image: item.image || '',
        tags: Array.isArray(item.tags) ? item.tags : []
    }));
}

export async function getPublicContent() {
    const content = buildFallbackContent();
    const supabase = getSupabaseClient();

    if (!supabase) {
        content.warnings.push('Supabase anon key is not configured. Using local fallback content.');
        return content;
    }

    const [menuResult, siteResult] = await Promise.all([
        supabase
            .from('menu_items')
            .select('id, name, description, image, tags, sort_order, is_active')
            .eq('is_active', true)
            .order('sort_order', { ascending: true })
            .order('id', { ascending: true }),
        supabase
            .from('site_content')
            .select('contact_info, franchise_stats, franchise_features, franchise_locations')
            .eq('id', 1)
            .single()
    ]);

    if (menuResult.error) {
        content.warnings.push(`Menu fetch failed: ${menuResult.error.message}`);
    } else {
        const dbMenu = normalizeMenu(menuResult.data);
        if (dbMenu.length) content.flavours = dbMenu;
    }

    if (siteResult.error) {
        content.warnings.push(`Site content fetch failed: ${siteResult.error.message}`);
    } else {
        const row = siteResult.data || {};
        const dbContact = asObject(row.contact_info, {});

        content.contactInfo = {
            ...content.contactInfo,
            ...dbContact,
            hours: asArray(dbContact.hours, content.contactInfo.hours),
            social: asArray(dbContact.social, content.contactInfo.social)
        };
        content.franchiseStats = asArray(row.franchise_stats, content.franchiseStats);
        content.franchiseFeatures = asArray(row.franchise_features, content.franchiseFeatures);
        content.franchiseLocations = asArray(row.franchise_locations, content.franchiseLocations);
    }

    content.source = content.warnings.length ? 'mixed' : 'supabase';
    return content;
}
