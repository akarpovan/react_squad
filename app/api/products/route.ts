import { NextResponse } from 'next/server';
import { pool } from '@/lib/db';

export async function GET() {
    try {
        const client = await pool.connect();

        const result = await client.query(`
      SELECT id, seller_id, name, description, price, category, images
      FROM public.products
    `);

        client.release();

        return NextResponse.json(result.rows);
    } catch (error) {
        console.error("Database error:", error);
        return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
    }
}