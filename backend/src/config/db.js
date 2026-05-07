const requiredEnv = ['SUPABASE_URL', 'SUPABASE_SERVICE_ROLE_KEY'];

const getSupabaseConfig = () => {
    const missing = requiredEnv.filter((key) => !process.env[key]);

    if (missing.length > 0) {
        throw new Error(`Missing Supabase environment variables: ${missing.join(', ')}`);
    }

    return {
        url: process.env.SUPABASE_URL.replace(/\/$/, ''),
        serviceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY,
    };
};

const supabaseFetch = async (path, options = {}) => {
    const { url, serviceRoleKey } = getSupabaseConfig();
    const response = await fetch(`${url}/rest/v1${path}`, {
        ...options,
        headers: {
            apikey: serviceRoleKey,
            Authorization: `Bearer ${serviceRoleKey}`,
            'Content-Type': 'application/json',
            ...(options.headers || {}),
        },
    });

    const contentType = response.headers.get('content-type') || '';
    const data = contentType.includes('application/json')
        ? await response.json()
        : await response.text();

    if (!response.ok) {
        if (data?.code === 'PGRST205') {
            const error = new Error(
                'Supabase tables are missing. Run backend/supabase/schema.sql in the Supabase SQL editor, then restart the backend.'
            );
            error.statusCode = response.status;
            error.code = data.code;
            throw error;
        }

        const error = new Error(
            data?.message || data?.details || data || 'Supabase request failed'
        );
        error.statusCode = response.status;
        error.code = data?.code;
        throw error;
    }

    return {
        data,
        count: parseContentRange(response.headers.get('content-range')),
    };
};

const parseContentRange = (contentRange) => {
    if (!contentRange) return null;
    const total = contentRange.split('/')[1];
    return total && total !== '*' ? Number(total) : null;
};

const connectDB = async () => {
    const { url } = getSupabaseConfig();

    await supabaseFetch('/users?select=id&limit=1', {
        headers: { Prefer: 'count=exact' },
    });

    console.log(`✅ Supabase connected: ${url}`);
};

module.exports = { connectDB, supabaseFetch };
