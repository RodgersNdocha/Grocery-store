import { Coffee, Anchor, Beef, Milk, Apple, Sparkles } from 'lucide-react';

const cats = [
  { name: 'Vegetable', icon: <Apple className="w-7 h-7 text-[#00b25a]" />, items: '12 items', bg: 'bg-green-50' },
  { name: 'Coffee & Drinks', icon: <Coffee className="w-7 h-7 text-orange-900" />, items: '12 items', bg: 'bg-orange-50' },
  { name: 'Meat', icon: <Beef className="w-7 h-7 text-white" />, items: '12 items', bg: 'bg-[#ff6b6b]' },
  { name: 'Milk & Dairy', icon: <Milk className="w-7 h-7 text-blue-600" />, items: '12 items', bg: 'bg-blue-50' },
  { name: 'Fresh Fruits', icon: <Apple className="w-7 h-7 text-red-500" />, items: '12 items', bg: 'bg-red-50' },
  { name: 'Cleaning Essential', icon: <Sparkles className="w-7 h-7 text-purple-600" />, items: '12 items', bg: 'bg-purple-50' },
];

export function TopCategories() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
      <div className="flex justify-between items-end mb-10 relative">
        <h2 className="text-3xl font-bold text-gray-900 relative z-10 tracking-tight">Top Categories</h2>
        <div className="absolute -top-10 left-0 text-gray-50 text-[120px] font-black z-0 tracking-tighter uppercase whitespace-nowrap overflow-hidden pointer-events-none select-none">
          SUPREO
        </div>
        <div className="flex gap-2 relative z-10">
           <button className="w-8 h-8 rounded-full border-2 border-gray-100 flex items-center justify-center text-gray-400 hover:text-[#ff6b6b] hover:border-[#ff6b6b] transition-colors">{"<"}</button>
           <button className="w-8 h-8 rounded-full bg-[#ff6b6b] text-white flex items-center justify-center transition-colors shadow-md shadow-[#ff6b6b]/40">{">"}</button>
        </div>
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
        {cats.map((c, i) => (
          <div key={i} className="flex flex-col items-center justify-center p-6 bg-white border border-gray-100 rounded-2xl hover:-translate-y-1 hover:shadow-xl hover:shadow-[#00b25a]/5 transition-all cursor-pointer">
             <div className={`w-20 h-20 rounded-full flex items-center justify-center mb-5 ${c.bg}`}>
                {c.icon}
             </div>
             <h3 className="font-bold text-gray-800 text-sm mb-1">{c.name}</h3>
             <p className="text-gray-400 text-xs">{c.items}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
