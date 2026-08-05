import { StarRating } from './StarRating';

export function ReviewCard({ review }: { review: any }) {
    return (
        <div className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
                <p className="font-medium text-sm">{review.reviewer_name}</p>
                <StarRating rating={review.rating} />
            </div>
            {review.review_text && (
                <p className="text-gray-700 text-sm leading-relaxed">{review.review_text}</p>
            )}
        </div>
    );
}