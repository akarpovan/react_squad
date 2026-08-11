import { Pool } from 'pg';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { StarRating } from '@/components/StarRating';
import { ReviewCard } from '@/components/ReviewCard';
import { ReviewForm } from '@/components/ReviewForm';

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl:
        process.env.NODE_ENV === 'production'
            ? { rejectUnauthorized: false }
            : false,
});

async function getProduct(id: string) {
    const client = await pool.connect();

    try {
        const result = await client.query(
            `SELECT p.*, u.name as seller_name, u.id as seller_user_id, sp.bio, sp.profile_image
             FROM products p
             JOIN users u ON p.seller_id = u.id
             LEFT JOIN seller_profiles sp ON u.id = sp.seller_id
             WHERE p.id = $1`,
            [id]
        );

        return result.rows[0] || null;
    } finally {
        client.release();
    }
}

async function getReviews(productId: string) {
    const client = await pool.connect();

    try {
        const result = await client.query(
            `SELECT r.*, u.name as reviewer_name
             FROM reviews r
             JOIN users u ON r.user_id = u.id
             WHERE r.product_id = $1
             ORDER BY r.id DESC`,
            [productId]
        );

        return result.rows;
    } finally {
        client.release();
    }
}

export default async function ProductDetailPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;

    const product = await getProduct(id);

    if (!product) {
        notFound();
    }

    const reviews = await getReviews(id);

    const averageRating =
        reviews.length > 0
            ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
            : 0;

    const imageUrl = product.images?.[0]
        ? `/images/${product.images[0]}`
        : '/placeholder-product.png';

    return (
        <div className="max-w-5xl mx-auto px-4 py-8">
            {/* Back to products */}
            <Link
                href="/products"
                className="text-sm text-gray-500 hover:text-black mb-6 inline-block"
            >
                ← Back to products
            </Link>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Product image */}
                <div className="relative w-full aspect-square bg-gray-100 rounded-lg overflow-hidden">
                    <Image
                        src={imageUrl}
                        alt={product.name}
                        fill
                        priority
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 50vw"
                    />
                </div>

                {/* Product information */}
                <div className="flex flex-col gap-4">
                    <div>
                        <span className="text-xs uppercase tracking-wide text-gray-500">
                            {product.category}
                        </span>

                        <h1 className="text-2xl font-bold mt-1">
                            {product.name}
                        </h1>
                    </div>

                    {/* Average rating */}
                    <div className="flex items-center gap-2">
                        <StarRating rating={averageRating} />

                        <span className="text-sm text-gray-500">
                            {averageRating > 0
                                ? `${averageRating.toFixed(1)} (${reviews.length} review${reviews.length !== 1 ? 's' : ''
                                })`
                                : 'No reviews yet'}
                        </span>
                    </div>

                    <p className="text-2xl font-semibold">
                        ${Number(product.price).toFixed(2)}
                    </p>

                    <p className="text-gray-700 leading-relaxed">
                        {product.description}
                    </p>

                    {/* Seller information */}
                    <Link
                        href={`/sellers/${product.seller_user_id}`}
                        className="flex items-center gap-3 mt-4 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                        <div className="relative w-12 h-12 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
                            {product.profile_image ? (
                                <Image
                                    src={`/images/${product.profile_image}`}
                                    alt={product.seller_name}
                                    fill
                                    className="object-cover"
                                    sizes="48px"
                                />
                            ) : null}
                        </div>

                        <div>
                            <p className="text-xs text-gray-500">
                                Sold by
                            </p>

                            <p className="text-sm font-medium">
                                {product.seller_name}
                            </p>
                        </div>
                    </Link>
                </div>
            </div>

            {/* Reviews section */}
            <div className="mt-12">
                <h2 className="text-xl font-bold mb-4">
                    Reviews {reviews.length > 0 && `(${reviews.length})`}
                </h2>

                {/* Add a review */}
                <ReviewForm productId={id} />

                {reviews.length === 0 ? (
                    <p className="text-gray-500">
                        This product doesn't have any reviews yet.
                    </p>
                ) : (
                    <div className="flex flex-col gap-4">
                        {reviews.map((review: any) => (
                            <ReviewCard
                                key={review.id}
                                review={review}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}