const cloudinary = require('../config/cloudinary');
const { supabaseFetch } = require('../config/db');
const { toBook } = require('../utils/recordMappers');

const getPublicIdFromUrl = (url) => {
    if (!url || !url.includes('cloudinary')) return null;
    try {
        const parts = url.split('/upload/');
        if (parts.length < 2) return null;
        const pathAfterUpload = parts[1].replace(/^v\d+\//, '');
        return pathAfterUpload.replace(/\.[^/.]+$/, '');
    } catch {
        return null;
    }
};

const deleteCloudinaryImage = async (publicId) => {
    if (!publicId) return;
    try {
        const result = await cloudinary.uploader.destroy(publicId);
        console.log(`Cloudinary image deleted: ${publicId}`, result);
    } catch (error) {
        console.error(`Failed to delete Cloudinary image: ${publicId}`, error.message);
    }
};

const encode = (value) => encodeURIComponent(String(value));

const getBookRowById = async (id) => {
    const { data } = await supabaseFetch(
        `/books?id=eq.${encode(id)}&select=*`
    );
    return data[0] || null;
};

const buildBookPayload = (body) => {
    const payload = {};

    if (body.title !== undefined) payload.title = body.title;
    if (body.subject !== undefined) payload.subject = body.subject;
    if (body.author !== undefined) payload.author = body.author;
    if (body.semester !== undefined) payload.semester = Number(body.semester);
    if (body.department !== undefined) payload.department = body.department;
    if (body.condition !== undefined) payload.condition = body.condition;
    if (body.price !== undefined) payload.price = Number(body.price);
    if (body.description !== undefined) payload.description = body.description;
    if (body.contactInfo !== undefined) payload.contact_info = body.contactInfo;
    if (body.imageUrl !== undefined) payload.image_url = body.imageUrl;
    if (body.imagePublicId !== undefined) payload.image_public_id = body.imagePublicId;

    return payload;
};

const getBooks = async (req, res, next) => {
    try {
        const {
            search,
            semester,
            department,
            condition,
            maxPrice,
            sold,
            page = 1,
            limit = 20,
        } = req.query;

        const currentPage = Math.max(Number(page), 1);
        const pageSize = Math.max(Number(limit), 1);
        const params = new URLSearchParams({
            select: '*',
            order: 'created_at.desc',
            limit: String(pageSize),
            offset: String((currentPage - 1) * pageSize),
        });

        if (search) {
            const cleanSearch = String(search).replace(/[(),]/g, ' ').trim();
            params.append(
                'or',
                `(title.ilike.*${cleanSearch}*,author.ilike.*${cleanSearch}*,subject.ilike.*${cleanSearch}*)`
            );
        }

        if (semester && semester !== 'all') params.append('semester', `eq.${semester}`);
        if (department && department !== 'all') params.append('department', `eq.${department}`);
        if (condition && condition !== 'all') params.append('condition', `eq.${condition}`);
        if (maxPrice) params.append('price', `lte.${maxPrice}`);
        params.append('sold', `eq.${sold !== undefined ? sold === 'true' : false}`);

        const { data, count } = await supabaseFetch(`/books?${params.toString()}`, {
            headers: { Prefer: 'count=exact' },
        });
        const books = data.map(toBook);
        const total = count ?? books.length;

        res.json({
            success: true,
            count: books.length,
            total,
            totalPages: Math.ceil(total / pageSize),
            currentPage,
            books,
        });
    } catch (error) {
        next(error);
    }
};

const getBook = async (req, res, next) => {
    try {
        const book = await getBookRowById(req.params.id);

        if (!book) {
            return res.status(404).json({
                success: false,
                message: 'Book not found',
            });
        }

        res.json({
            success: true,
            book: toBook(book),
        });
    } catch (error) {
        next(error);
    }
};

const createBook = async (req, res, next) => {
    try {
        const payload = buildBookPayload(req.body);

        if (req.file) {
            payload.image_url = req.file.path;
            payload.image_public_id = req.file.filename;
        }

        payload.seller = req.user.id;
        payload.seller_name = req.user.name;
        payload.seller_email = req.user.email;
        payload.campus = req.user.campus;

        const { data } = await supabaseFetch('/books?select=*', {
            method: 'POST',
            headers: { Prefer: 'return=representation' },
            body: JSON.stringify(payload),
        });

        res.status(201).json({
            success: true,
            message: 'Book listed successfully',
            book: toBook(data[0]),
        });
    } catch (error) {
        next(error);
    }
};

const updateBook = async (req, res, next) => {
    try {
        const book = await getBookRowById(req.params.id);

        if (!book) {
            return res.status(404).json({
                success: false,
                message: 'Book not found',
            });
        }

        if (book.seller !== req.user.id) {
            return res.status(403).json({
                success: false,
                message: 'Not authorized to update this listing',
            });
        }

        const payload = buildBookPayload(req.body);

        if (req.file) {
            if (book.image_public_id) {
                await deleteCloudinaryImage(book.image_public_id);
            } else if (book.image_url) {
                await deleteCloudinaryImage(getPublicIdFromUrl(book.image_url));
            }

            payload.image_url = req.file.path;
            payload.image_public_id = req.file.filename;
        }

        payload.updated_at = new Date().toISOString();

        const { data } = await supabaseFetch(
            `/books?id=eq.${encode(req.params.id)}&select=*`,
            {
                method: 'PATCH',
                headers: { Prefer: 'return=representation' },
                body: JSON.stringify(payload),
            }
        );

        res.json({
            success: true,
            message: 'Book updated successfully',
            book: toBook(data[0]),
        });
    } catch (error) {
        next(error);
    }
};

const deleteBook = async (req, res, next) => {
    try {
        const book = await getBookRowById(req.params.id);

        if (!book) {
            return res.status(404).json({
                success: false,
                message: 'Book not found',
            });
        }

        if (book.seller !== req.user.id) {
            return res.status(403).json({
                success: false,
                message: 'Not authorized to delete this listing',
            });
        }

        if (book.image_public_id) {
            await deleteCloudinaryImage(book.image_public_id);
        } else if (book.image_url && book.image_url.includes('cloudinary')) {
            await deleteCloudinaryImage(getPublicIdFromUrl(book.image_url));
        }

        await supabaseFetch(`/books?id=eq.${encode(req.params.id)}`, {
            method: 'DELETE',
        });

        res.json({
            success: true,
            message: 'Book listing and image deleted successfully',
        });
    } catch (error) {
        next(error);
    }
};

const toggleWishlist = async (req, res, next) => {
    try {
        const book = await getBookRowById(req.params.id);

        if (!book) {
            return res.status(404).json({
                success: false,
                message: 'Book not found',
            });
        }

        const { data: existing } = await supabaseFetch(
            `/wishlists?user_id=eq.${encode(req.user.id)}&book_id=eq.${encode(req.params.id)}&select=book_id`
        );

        let message;

        if (existing.length > 0) {
            await supabaseFetch(
                `/wishlists?user_id=eq.${encode(req.user.id)}&book_id=eq.${encode(req.params.id)}`,
                { method: 'DELETE' }
            );
            message = 'Removed from wishlist';
        } else {
            await supabaseFetch('/wishlists', {
                method: 'POST',
                body: JSON.stringify({
                    user_id: req.user.id,
                    book_id: req.params.id,
                }),
            });
            message = 'Added to wishlist';
        }

        const { data: wishlist } = await supabaseFetch(
            `/wishlists?user_id=eq.${encode(req.user.id)}&select=book_id`
        );

        res.json({
            success: true,
            wishlist: wishlist.map((item) => item.book_id),
            message,
        });
    } catch (error) {
        next(error);
    }
};

const getMyBooks = async (req, res, next) => {
    try {
        const { data } = await supabaseFetch(
            `/books?seller=eq.${encode(req.user.id)}&select=*&order=created_at.desc`
        );
        const books = data.map(toBook);

        res.json({
            success: true,
            count: books.length,
            books,
        });
    } catch (error) {
        next(error);
    }
};

const getWishlist = async (req, res, next) => {
    try {
        const { data: wishlist } = await supabaseFetch(
            `/wishlists?user_id=eq.${encode(req.user.id)}&select=book_id`
        );
        const ids = wishlist.map((item) => item.book_id);

        if (ids.length === 0) {
            return res.json({
                success: true,
                count: 0,
                books: [],
            });
        }

        const { data } = await supabaseFetch(
            `/books?id=in.(${ids.map(encode).join(',')})&select=*&order=created_at.desc`
        );
        const books = data.map(toBook);

        res.json({
            success: true,
            count: books.length,
            books,
        });
    } catch (error) {
        next(error);
    }
};

const markAsSold = async (req, res, next) => {
    try {
        const book = await getBookRowById(req.params.id);

        if (!book) {
            return res.status(404).json({
                success: false,
                message: 'Book not found',
            });
        }

        if (book.seller !== req.user.id) {
            return res.status(403).json({
                success: false,
                message: 'Not authorized to update this listing',
            });
        }

        const { data } = await supabaseFetch(
            `/books?id=eq.${encode(req.params.id)}&select=*`,
            {
                method: 'PATCH',
                headers: { Prefer: 'return=representation' },
                body: JSON.stringify({
                    sold: !book.sold,
                    updated_at: new Date().toISOString(),
                }),
            }
        );
        const updatedBook = toBook(data[0]);

        res.json({
            success: true,
            book: updatedBook,
            message: updatedBook.sold ? 'Book marked as sold' : 'Book marked as available',
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getBooks,
    getBook,
    createBook,
    updateBook,
    deleteBook,
    toggleWishlist,
    getMyBooks,
    getWishlist,
    markAsSold,
};
