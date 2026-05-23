export function PromoBanners() {
  const banners = [
    { id: 1, title: 'VEGETABLES', sub: 'Fresh & Healthy', bg: 'bg-emerald-50', border: 'border-emerald-100', color: 'text-[#00b25a]' },
    { id: 2, title: 'VEGETABLES', sub: 'Fresh & Healthy', bg: 'bg-orange-50', border: 'border-orange-100', color: 'text-orange-500' },
    { id: 3, title: 'VEGETABLES', sub: 'Fresh & Healthy', bg: 'bg-green-50', border: 'border-green-100', color: 'text-[#00b25a]' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {banners.map((item) => (
             <div key={item.id} className={`relative rounded-3xl overflow-hidden p-6 sm:p-8 flex items-center h-48 border ${item.bg} ${item.border}`}>
                <div className="z-10 relative space-y-1">
                   <p className={`text-sm font-medium ${item.color} font-serif italic`}>{item.sub}</p>
                   <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 tracking-tight uppercase">{item.title}</h3>
                   <button className="bg-gray-900 text-white px-5 py-2 rounded-full text-xs font-semibold hover:bg-gray-800 transition-colors shadow-sm">
                     Shop Now →
                   </button>
                </div>
                {/* 20% badge */}
                <div className="absolute top-4 right-[45%] bg-[#00b25a] text-white rounded-full w-12 h-12 flex flex-col items-center justify-center text-xs font-black shadow-lg z-20 leading-none">
                  <span>20%</span>
                  <span className="text-[8px] font-normal">OFF</span>
                </div>
                <img 
                  src="https://images.unsplash.com/photo-1597362925123-77861d3fbac7?w=400&q=80"
                  className="absolute -right-4 top-0 h-full w-2/3 object-cover mix-blend-multiply opacity-90 rounded-l-full"
                  alt="Vegetables"
                />
             </div>
          ))}
       </div>
    </div>
  );
}
