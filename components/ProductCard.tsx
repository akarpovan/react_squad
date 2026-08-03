'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export function ProductCard({ product }: { product: any }) {
    const initialSrc = product.images?.[0]
        ? `/images/${product.images[0]}`
        : '/placeholder-product.png';

    const [imgSrc, setImgSrc] = useState(initialSrc);

    return (
        <Link
            href={`/products/${product.id}`}
            className="group flex flex-col rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
        >
            <div className="relative w-full aspect-square bg-gray-100">
                <Image
                    src={imgSrc}
                    alt={product.name}
                    fill
                    onError={() => setImgSrc('/placeholder-product.png')}
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                />
            </div>

            <div className="p-3 flex flex-col gap-1">
                <p className="text-sm font-medium line-clamp-2">{product.name}</p>
                <p className="text-sm font-semibold mt-1">${Number(product.price).toFixed(2)}</p>
            </div>
        </Link>
    );
}