import { NextResponse } from 'next/server';
import { pool } from '@/lib/db';

export async function PATCH(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const body = await request.json();

        const { rating, review_text } = body;

        if (!rating || !review_text?.trim()) {
            return NextResponse.json(
                { error: 'Rating and review are required.' },
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
            `UPDATE reviews
             SET rating = $1,
                 review_text = $2
             WHERE id = $3
             RETURNING *`,
            [rating, review_text.trim(), id]
        );

        if (result.rows.length === 0) {
            return NextResponse.json(
                { error: 'Review not found.' },
                { status: 404 }
            );
        }

        return NextResponse.json(result.rows[0]);
    } catch (error) {
        console.error('Error updating review:', error);

        return NextResponse.json(
            { error: 'Failed to update review.' },
            { status: 500 }
        );
    }
}

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;

        const result = await pool.query(
            `DELETE FROM reviews
             WHERE id = $1
             RETURNING id`,
            [id]
        );

        if (result.rows.length === 0) {
            return NextResponse.json(
                { error: 'Review not found.' },
                { status: 404 }
            );
        }

        return NextResponse.json({
            message: 'Review deleted successfully.'
        });
    } catch (error) {
        console.error('Error deleting review:', error);

        return NextResponse.json(
            { error: 'Failed to delete review.' },
            { status: 500 }
        );
    }
}