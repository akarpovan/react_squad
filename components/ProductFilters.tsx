'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';

const CATEGORIES = [
    'All',
    'Jewelers',
    'Ceramics',
    'Textiles',
    'Candles',
    'Artwork',
    'Bags',
    'Hats',
];

export function ProductFilters() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [category, setCategory] = useState(searchParams?.get('category') || 'All');
    const [minPrice, setMinPrice] = useState(searchParams?.get('minPrice') || '');
    const [maxPrice, setMaxPrice] = useState(searchParams?.get('maxPrice') || '');
    const [search, setSearch] = useState(searchParams?.get('search') || '');

    function handleSearch(e: React.FormEvent) {
        e.preventDefault();

        const params = new URLSearchParams();

        if (category && category !== 'All') params.set('category', category);
        if (minPrice) params.set('minPrice', minPrice);
        if (maxPrice) params.set('maxPrice', maxPrice);
        if (search) params.set('search', search);

        router.push(`/products?${params.toString()}`);
    }

    function handleClear() {
        setCategory('All');
        setMinPrice('');
        setMaxPrice('');
        setSearch('');
        router.push('/products');
    }

    return (
        <form
            onSubmit={handleSearch}
            className="flex flex-col md:flex-row md:items-end gap-4 mb-8 p-4 border border-gray-200 rounded-lg"
        >
            {/* Búsqueda por texto */}
            <div className="flex-1 flex flex-col gap-1">
                <label htmlFor="search" className="text-sm font-medium">
                    Search
                </label>
                <input
                    id="search"
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search products..."
                    className="border border-gray-300 rounded-md px-3 py-2 text-sm"
                />
            </div>

            {/* Categoría */}
            <div className="flex flex-col gap-1">
                <label htmlFor="category" className="text-sm font-medium">
                    Category
                </label>
                <select
                    id="category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="border border-gray-300 rounded-md px-3 py-2 text-sm"
                >
                    {CATEGORIES.map((cat) => (
                        <option key={cat} value={cat}>
                            {cat}
                        </option>
                    ))}
                </select>
            </div>

            {/* Rango de precio */}
            <div className="flex flex-col gap-1">
                <label className="text-sm font-medium">Price range</label>
                <div className="flex items-center gap-2">
                    <input
                        type="number"
                        min="0"
                        value={minPrice}
                        onChange={(e) => setMinPrice(e.target.value)}
                        placeholder="Min"
                        className="w-24 border border-gray-300 rounded-md px-3 py-2 text-sm"
                    />
                    <span className="text-gray-400">–</span>
                    <input
                        type="number"
                        min="0"
                        value={maxPrice}
                        onChange={(e) => setMaxPrice(e.target.value)}
                        placeholder="Max"
                        className="w-24 border border-gray-300 rounded-md px-3 py-2 text-sm"
                    />
                </div>
            </div>

            {/* Botones */}
            <div className="flex gap-2">
                <button
                    type="submit"
                    className="bg-black text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-800 transition-colors"
                >
                    Search
                </button>
                <button
                    type="button"
                    onClick={handleClear}
                    className="border border-gray-300 px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-50 transition-colors"
                >
                    Clear
                </button>
            </div>
        </form>
    );
}