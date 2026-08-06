// app/sellers/page.tsx
import Link from 'next/link';
import sellersData from './data/sellers.json';

export default function SellersPage() {
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Sellers</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Discover talented artisans and makers from around the world
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {sellersData.map((seller) => (
          <div
            key={seller.id}
            className="border border-gray-200 rounded-2xl p-8 text-center hover:border-[#c95f3b] transition-colors"
          >
            <div className="w-20 h-20 mx-auto bg-orange-100 rounded-full flex items-center justify-center mb-6 overflow-hidden">
              <img
                src={seller.image}
                alt={seller.name}
                className="w-16 h-16 object-cover rounded-full"
              />
            </div>
            <h3 className="text-xl font-semibold mb-2">{seller.name}</h3>
            <p className="text-gray-500 mb-6">{seller.title} • {seller.location}</p>

            <Link
              href={`/sellers/${seller.id}`}
              className="text-[#c95f3b] hover:underline font-medium"
            >
              View Profile →
            </Link>
          </div>
        ))}
      </div>

      <div className="mt-16 text-center">
        <p className="text-sm text-gray-500">
          Want to become a seller? 
          <Link href="/sell" className="text-[#c95f3b] hover:underline ml-1">
            Apply here
          </Link>
        </p>
      </div>
    </main>
  );
}
