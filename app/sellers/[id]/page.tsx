import sellersData from '../data/sellers.json';
import Link from 'next/link';

type Product = {
  name: string;
  description?: string;
  price?: string;
  image?: string;
};

type Seller = {
  id: string;
  name: string;
  title: string;
  location: string;
  image: string;
  bio: string;
  specialties: string[];
  products: Product[];
};

export async function generateStaticParams() {
  return sellersData.map((seller) => ({
    id: seller.id,
  }));
}

export default async function SellerProfile({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const seller = sellersData.find((s) => s.id === id) as Seller | undefined;

  if (!seller) {
    return (
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-12 text-center">
        <h1 className="text-4xl font-bold text-gray-900">Seller not found</h1>
        <p className="mt-6 text-gray-600">The seller with ID "{id}" does not exist.</p>
        <Link href="/sellers" className="text-[#c95f3b] hover:underline mt-6 inline-block">
          ← Back to All Sellers
        </Link>
      </main>
    );
  }

  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
      <Link
        href="/sellers"
        className="inline-flex items-center text-sm text-gray-500 hover:underline mb-8"
      >
        ← Back to All Sellers
      </Link>

      <div className="bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-sm">
        <div className="h-64 bg-orange-50 flex items-center justify-center">
          <img
            src={seller.image}
            alt={seller.name}
            className="w-48 h-48 object-cover rounded-full border-8 border-white shadow-xl"
          />
        </div>

        <div className="p-10 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">{seller.name}</h1>
          <p className="text-xl text-[#c95f3b] mb-8">
            {seller.title} • {seller.location}
          </p>

          <p className="text-gray-600 text-lg leading-relaxed max-w-2xl mx-auto mb-10">
            {seller.bio}
          </p>

          <div className="mb-10">
            <h3 className="font-semibold text-gray-800 mb-4">Specialties</h3>
            <div className="flex flex-wrap justify-center gap-3">
              {seller.specialties.map((specialty) => (
                <span
                  key={specialty}
                  className="bg-orange-50 text-[#c95f3b] px-6 py-2 rounded-full text-sm font-medium"
                >
                  {specialty}
                </span>
              ))}
            </div>
          </div>

          
          <div className="mb-10">
            <h3 className="font-semibold text-gray-800 mb-4">Products</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {seller.products.map((product) => (
                <div key={product.name} className="border border-gray-200 rounded-2xl p-6 text-center hover:border-[#c95f3b] transition-colors"> 
                {product.image && (
                  <div className="w-32 h-32 mx-auto bg-orange-100 rounded-full flex items-center justify-center mb-4 overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover rounded-full"
                    />
                  </div>
                )}
                <h4 className="font-bold text-lg mb-2">{product.name}</h4>
                {product.description && (
                  <p className="text-gray-600 mb-4">{product.description}</p>
                )}
                {product.price && (
                  <p className="text-2xl font-bold text-[#c95f3b]">${product.price}</p>
                )}
              </div>
            ))}
          </div>
            
        </div>
        </div>
      </div>
    </main>
  );
}

 
