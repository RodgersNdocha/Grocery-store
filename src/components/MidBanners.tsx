export function MidBanners() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-auto min-h-[280px]">
         <div className="relative rounded-3xl overflow-hidden bg-green-50 min-h-[280px] group">
            <img src="https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&q=80" alt="Banner 1" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-r from-white/90 to-transparent p-10 flex flex-col justify-center">
              <p className="text-[#00b25a] text-sm font-medium italic font-serif mb-2">Enjoy up to 20% →</p>
              <h3 className="text-3xl font-bold text-gray-900 mb-6 max-w-xs leading-tight">Fresh Vegetable</h3>
              <button className="bg-[#00b25a] text-white px-6 py-2.5 rounded-full text-xs font-bold uppercase transition-colors inline-block w-max shadow-md shadow-[#00b25a]/30 hover:bg-[#009249]">
                 Shop Now →
               </button>
            </div>
         </div>
         <div className="relative rounded-3xl overflow-hidden bg-[#0A3622] p-10 flex flex-col justify-center min-h-[280px] group">
            <img src="https://images.unsplash.com/photo-1604514628550-37477afdf4e3?w=800&q=80" alt="Banner 2 bg" className="absolute inset-0 w-full h-full object-cover opacity-20 mix-blend-overlay transition-transform duration-700 group-hover:scale-105" />
            <div className="relative z-10 md:w-3/4 text-white">
               <p className="text-emerald-400 text-xs font-medium italic font-serif mb-3">Enjoy up to 20% off Products</p>
               <h3 className="text-3xl font-bold mb-8 leading-tight tracking-wide">All Tasted Organic & Fresh Products</h3>
               <button className="bg-[#00b25a] text-white px-6 py-2.5 rounded-full text-xs font-bold uppercase transition-colors inline-block w-max shadow-md shadow-[#00b25a]/30 hover:bg-[#009249]">
                 Shop Now →
               </button>
            </div>
         </div>
      </div>
    </div>
  );
}
