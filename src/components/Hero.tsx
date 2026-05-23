export function Hero() {
  return (
    <div className="relative bg-white overflow-hidden py-12 sm:py-20 lg:py-24">
      {/* Background shape */}
      <div className="absolute right-0 top-0 w-2/3 md:w-1/2 h-full bg-[#00b25a] rounded-l-[150px] lg:rounded-bl-[250px] z-0"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 pr-0 md:pr-8 lg:pr-12">
          <p className="text-[#ff6b6b] font-semibold text-sm tracking-widest mb-3 uppercase flex items-center gap-2">
            <span className="w-8 h-px bg-[#ff6b6b] inline-block"></span> GET SAVE 30% OFF
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-gray-900 leading-tight mb-6">
            Farm Fresh Organic <span className="text-[#00b25a]">Vegetables.</span>
          </h1>
          <p className="text-gray-500 mb-8 max-w-lg text-sm sm:text-base leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor 
            aliqua. Quis ipsum suspendisse ultrices gravida.
          </p>
          <button className="bg-[#00b25a] hover:bg-[#009249] text-white px-8 py-3.5 rounded-full font-medium transition-colors inline-flex items-center gap-2 shadow-lg shadow-[#00b25a]/30">
            Shop Collection <span className="text-lg">→</span>
          </button>
        </div>
        <div className="md:w-1/2 mt-12 md:mt-0 relative">
           <img 
             src="https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&q=80" 
             alt="Fresh vegetables box" 
             className="w-full h-auto object-cover rounded-3xl"
             style={{ 
               maskImage: 'radial-gradient(ellipse, white 60%, transparent 100%)',
               WebkitMaskImage: 'radial-gradient(ellipse, white 60%, transparent 100%)'
             }}
           />
        </div>
      </div>
    </div>
  );
}
