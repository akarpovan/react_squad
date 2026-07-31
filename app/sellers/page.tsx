import Link from 'next/link';

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
        <div className="border border-gray-200 rounded-2xl p-8 text-center hover:border-[#c95f3b] transition-colors">
          <div className="w-20 h-20 mx-auto bg-orange-100 rounded-full flex items-center justify-center mb-6">
              <img 
                src="/images/lisa.png" 
                alt="Description of image" 
                className="w-10 h-10 object-contain rounded-full" 
              />
          </div>
          <h3 className="text-xl font-semibold mb-2">Lisa Rosen</h3>
          <p className="text-gray-500 mb-4">Candle Maker • South America</p>
          <Link 
            href="/sellers/lisa-rosen" 
            className="text-[#c95f3b] hover:underline font-medium"
          >
            View Profile →
          </Link>
        </div>
        <div className="border border-gray-200 rounded-2xl p-8 text-center hover:border-[#c95f3b] transition-colors">
          <div className="w-20 h-20 mx-auto bg-orange-100 rounded-full flex items-center justify-center mb-6">
              <img 
                src="/images/brad.png" 
                alt="Description of image" 
                className="w-10 h-10 object-contain rounded-full" 
              />
          </div>
          <h3 className="text-xl font-semibold mb-2">Brad Simons</h3>
          <p className="text-gray-500 mb-4">Abstract Artist • North America</p>
          <Link 
            href="/sellers/brad-simons" 
            className="text-[#c95f3b] hover:underline font-medium"
          >
            View Profile →
          </Link>
        </div>
        <div className="border border-gray-200 rounded-2xl p-8 text-center hover:border-[#c95f3b] transition-colors">
          <div className="w-20 h-20 mx-auto bg-orange-100 rounded-full flex items-center justify-center mb-6">
              <img 
                src="/images/matt.png" 
                alt="Description of image" 
                className="w-10 h-10 object-contain rounded-full" 
              />
          </div>
          <h3 className="text-xl font-semibold mb-2">Matt Stafford</h3>
          <p className="text-gray-500 mb-4">Artist • North America</p>
          <Link 
            href="/sellers/matt-stafford" 
            className="text-[#c95f3b] hover:underline font-medium"
          >
            View Profile →
          </Link>
        </div>
        <div className="border border-gray-200 rounded-2xl p-8 text-center hover:border-[#c95f3b] transition-colors">
          <div className="w-20 h-20 mx-auto bg-orange-100 rounded-full flex items-center justify-center mb-6">
              <img 
                src="/images/rena.png" 
                alt="Description of image" 
                className="w-10 h-10 object-contain rounded-full" 
              />  
          </div>
          <h3 className="text-xl font-semibold mb-2">Rena Lopez</h3>
          <p className="text-gray-500 mb-4">Sculptor • Caribbean</p>
          <Link 
            href="/sellers/rena-lopez" 
            className="text-[#c95f3b] hover:underline font-medium"
          >
            View Profile →
          </Link>
        </div>
        <div className="border border-gray-200 rounded-2xl p-8 text-center hover:border-[#c95f3b] transition-colors">
          <div className="w-20 h-20 mx-auto bg-orange-100 rounded-full flex items-center justify-center mb-6">
              <img 
                src="/images/tony.png" 
                alt="Description of image" 
                className="w-10 h-10 object-contain rounded-full" 
              />
          </div>
          <h3 className="text-xl font-semibold mb-2">Tony Espinoza</h3>
          <p className="text-gray-500 mb-4">Artist • Central America</p>
          <Link 
            href="/sellers/tony-espinoza" 
            className="text-[#c95f3b] hover:underline font-medium"
          >
            View Profile →
          </Link>
        </div>
        <div className="border border-gray-200 rounded-2xl p-8 text-center hover:border-[#c95f3b] transition-colors">
          <div className="w-20 h-20 mx-auto bg-orange-100 rounded-full flex items-center justify-center mb-6">
              <img 
                src="/images/maria.png" 
                alt="Description of image" 
                className="w-10 h-10 object-contain rounded-full" 
              />
          </div>
          <h3 className="text-xl font-semibold mb-2">Maria Silva</h3>
          <p className="text-gray-500 mb-4">Ceramic Artist • South America</p>
          <Link 
            href="/sellers/maria-silva" 
            className="text-[#c95f3b] hover:underline font-medium"
          >
            View Profile →
          </Link>
        </div>
        
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