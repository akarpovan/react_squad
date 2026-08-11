'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export function ReviewForm({ productId }: { productId: string }) {
    const router = useRouter();

    const [rating, setRating] = useState(5);
    const [reviewText, setReviewText] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState('');

    async function handleSubmit(event: React.FormEvent) {
        event.preventDefault();

        setError('');

        if (!reviewText.trim()) {
            setError('Please write a review.');
            return;
        }

        setSubmitting(true);

        try {
            const response = await fetch('/api/reviews', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    product_id: productId,
                    rating,
                    review_text: reviewText,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.error || 'Failed to submit review.'
                );
            }

            setReviewText('');
            setRating(5);

            router.refresh();
        } catch (error) {
            setError(
                error instanceof Error
                    ? error.message
                    : 'Something went wrong.'
            );
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="mb-8 rounded-xl border p-6"
        >
            <h3 className="text-xl font-semibold mb-4">
                Leave a Review
            </h3>

            <div className="mb-4">
                <label className="block mb-2 font-medium">
                    Rating
                </label>

                <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <button
                            key={star}
                            type="button"
                            onClick={() => setRating(star)}
                            className="text-2xl"
                            aria-label={`Rate ${star} stars`}
                        >
                            <span
                                className={
                                    star <= rating
                                        ? 'text-yellow-500'
                                        : 'text-gray-300'
                                }
                            >
                                ★
                            </span>
                        </button>
                    ))}
                </div>
            </div>

            <div className="mb-4">
                <label
                    htmlFor="review"
                    className="block mb-2 font-medium"
                >
                    Your Review
                </label>

                <textarea
                    id="review"
                    value={reviewText}
                    onChange={(event) =>
                        setReviewText(event.target.value)
                    }
                    placeholder="Write your review..."
                    rows={4}
                    className="w-full rounded-lg border p-3"
                />
            </div>

            {error && (
                <p className="mb-4 text-red-600">
                    {error}
                </p>
            )}

            <button
                type="submit"
                disabled={submitting}
                className="rounded-lg bg-black px-5 py-2 text-white disabled:opacity-50"
            >
                {submitting ? 'Submitting...' : 'Submit Review'}
            </button>
        </form>
    );
}
