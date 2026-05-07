export const API_BASE_URL =
    import.meta.env.VITE_API_URL ?? 'http://localhost:5000/api';

// Helper to get token from localStorage
const getToken = (): string | null => {
    return localStorage.getItem('token');
};

// Helper to build headers
const getHeaders = (includeAuth = false, isFormData = false): HeadersInit => {
    const headers: HeadersInit = {};

    if (!isFormData) {
        headers['Content-Type'] = 'application/json';
    }

    if (includeAuth) {
        const token = getToken();
        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }
    }

    return headers;
};

// Generic fetch wrapper
export const getErrorMessage = (error: unknown, fallback = 'Something went wrong') => {
    return error instanceof Error ? error.message : fallback;
};

// Generic fetch wrapper
const apiFetch = async (endpoint: string, options: RequestInit = {}) => {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, options);
    const contentType = response.headers.get('content-type');
    const data = contentType?.includes('application/json')
        ? await response.json()
        : { message: response.statusText };

    if (!response.ok) {
        throw new Error(data.message || 'Something went wrong');
    }

    return data;
};

// ==================== AUTH API ====================

export const authAPI = {
    register: async (userData: {
        name: string;
        email: string;
        password: string;
        campus: string;
        department: string;
        semester: number;
    }) => {
        const data = await apiFetch('/auth/register', {
            method: 'POST',
            headers: getHeaders(),
            body: JSON.stringify(userData),
        });
        if (data.token) {
            localStorage.setItem('token', data.token);
        }
        return data;
    },

    login: async (credentials: { email: string; password: string }) => {
        const data = await apiFetch('/auth/login', {
            method: 'POST',
            headers: getHeaders(),
            body: JSON.stringify(credentials),
        });
        if (data.token) {
            localStorage.setItem('token', data.token);
        }
        return data;
    },

    getMe: async () => {
        return apiFetch('/auth/me', {
            headers: getHeaders(true),
        });
    },

    updateProfile: async (profileData: {
        name?: string;
        campus?: string;
        department?: string;
        semester?: number;
    }) => {
        return apiFetch('/auth/me', {
            method: 'PUT',
            headers: getHeaders(true),
            body: JSON.stringify(profileData),
        });
    },

    logout: () => {
        localStorage.removeItem('token');
    },

    isAuthenticated: (): boolean => {
        return !!getToken();
    },
};

// ==================== BOOKS API ====================

export interface BookFilters {
    search?: string;
    semester?: string;
    department?: string;
    condition?: string;
    maxPrice?: string;
    sold?: string;
    page?: number;
    limit?: number;
}

export const booksAPI = {
    getAll: async (filters: BookFilters = {}) => {
        const params = new URLSearchParams();

        Object.entries(filters).forEach(([key, value]) => {
            if (value !== undefined && value !== '' && value !== 'all') {
                params.append(key, String(value));
            }
        });

        const queryString = params.toString();
        return apiFetch(`/books${queryString ? `?${queryString}` : ''}`);
    },

    getById: async (id: string) => {
        return apiFetch(`/books/${id}`);
    },

    getMyBooks: async () => {
        return apiFetch('/books/my-books', {
            headers: getHeaders(true),
        });
    },

    getWishlist: async () => {
        return apiFetch('/books/wishlist', {
            headers: getHeaders(true),
        });
    },

    create: async (bookData: FormData) => {
        return apiFetch('/books', {
            method: 'POST',
            headers: getHeaders(true, true),
            body: bookData,
        });
    },

    update: async (id: string, bookData: FormData) => {
        return apiFetch(`/books/${id}`, {
            method: 'PUT',
            headers: getHeaders(true, true),
            body: bookData,
        });
    },

    delete: async (id: string) => {
        return apiFetch(`/books/${id}`, {
            method: 'DELETE',
            headers: getHeaders(true),
        });
    },

    toggleWishlist: async (id: string) => {
        return apiFetch(`/books/${id}/wishlist`, {
            method: 'POST',
            headers: getHeaders(true),
        });
    },

    markAsSold: async (id: string) => {
        return apiFetch(`/books/${id}/sold`, {
            method: 'PUT',
            headers: getHeaders(true),
        });
    },
};
