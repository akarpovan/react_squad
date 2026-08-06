import { Pool } from 'pg';
import { ProductCard } from '@/components/ProductCard';
import { ProductFilters } from '@/components/ProductFilters';
import { Suspense } from 'react';

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
});

/*async function getProducts() {
    const client = await pool.connect();
    try {
        const result = await client.query(`
      SELECT p.*, u.name as seller_name, sp.profile_image
      FROM products p
      JOIN users u ON p.seller_id = u.id
      LEFT JOIN seller_profiles sp ON u.id = sp.seller_id
    `);
        return result.rows;
    } finally {
        client.release();
    }
}

export default async function ProductsPage() {
    const products = await getProducts();

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-6">Our Products</h1>
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                {products.map((product: any) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
}*/

interface SearchParams {
    category?: string;
    minPrice?: string;
    maxPrice?: string;
    search?: string;
}

async function getProducts(filters: SearchParams) {
    const client = await pool.connect();
    try {
        const conditions: string[] = [];
        const values: any[] = [];
        let paramIndex = 1;

        if (filters.category) {
            conditions.push(`p.category = $${paramIndex}`);
            values.push(filters.category);
            paramIndex++;
        }

        if (filters.minPrice) {
            conditions.push(`p.price >= $${paramIndex}`);
            values.push(Number(filters.minPrice));
            paramIndex++;
        }

        if (filters.maxPrice) {
            conditions.push(`p.price <= $${paramIndex}`);
            values.push(Number(filters.maxPrice));
            paramIndex++;
        }

        if (filters.search) {
            conditions.push(`(p.name ILIKE $${paramIndex} OR p.description ILIKE $${paramIndex})`);
            values.push(`%${filters.search}%`);
            paramIndex++;
        }

        const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '';

        const query = `
            SELECT p.*, u.name as seller_name, sp.profile_image
            FROM products p
            JOIN users u ON p.seller_id = u.id
            LEFT JOIN seller_profiles sp ON u.id = sp.seller_id
            ${whereClause}
            ORDER BY p.name ASC
        `;

        const result = await client.query(query, values);
        return result.rows;
    } finally {
        client.release();
    }
}

export default async function ProductsPage({
    searchParams,
}: {
    searchParams: Promise<SearchParams>;
}) {
    const filters = await searchParams;
    const products = await getProducts(filters);

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-6">Our Products</h1>

            <Suspense fallback={<div>Loading filters...</div>}>
                <ProductFilters />
            </Suspense>

            <p className="text-sm text-gray-500 mb-4">
                {products.length} product{products.length !== 1 ? 's' : ''} found
            </p>

            {products.length === 0 ? (
                <p className="text-center text-gray-500 py-12">
                    No products match your filters.
                </p>
            ) : (
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                    {products.map((product: any) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            )}
        </div>
    );
}

