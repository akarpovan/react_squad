import { NextResponse } from 'next/server';
import { pool } from '@/lib/db';

const GUEST_USER_ID = '22222222-2222-2222-2222-222222222222';

export async function POST(request: Request) {
    try {
        const body = await request.json();

        const { product_id, rating, review_text } = body;

        if (!product_id || !rating || !review_text?.trim()) {
            return NextResponse.json(
                { error: 'Product, rating, and review are required.' },
                { status: 400 }
            );
        }

        if (rating < 1 || rating > 5) {
            return NextResponse.json(
                { error: 'Rating must be between 1 and 5.' },
                { status: 400 }
            );
        }

        const result = await pool.query(
            `INSERT INTO reviews (product_id, user_id, rating, review_text)
             VALUES ($1, $2, $3, $4)
             RETURNING *`,
            [product_id, GUEST_USER_ID, rating, review_text.trim()]
        );

        return NextResponse.json(result.rows[0], { status: 201 });
    } catch (error) {
        console.error('Error creating review:', error);

        return NextResponse.json(
            { error: 'Failed to create review.' },
            { status: 500 }
        );
    }
}