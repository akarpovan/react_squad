export default async function SellerProfile({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="border border-gray-200 rounded-2xl p-8 text-center hover:border-[#c95f3b] transition-colors">
                
            </div>
        </div>
    </main>
  );
}
 
