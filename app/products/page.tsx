import { Pool } from 'pg';
import { ProductCard } from '@/components/ProductCard';

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
});

async function getProducts() {
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
}