import { Phone, Mail } from 'lucide-react';

export function TopBar() {
  return (
    <div className="bg-[#1e1e1e] text-gray-300 text-xs py-2">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-2">
        <div className="flex items-center gap-6">
           <div className="flex items-center gap-2">
             <Phone className="w-3 h-3 text-[#00b25a]" />
             <span>(08) 873 996 06321</span>
           </div>
           <div className="flex items-center gap-2">
             <Mail className="w-3 h-3 text-[#00b25a]" />
             <span>homedokan@gmail.com</span>
           </div>
        </div>
        <div className="flex items-center gap-4">
           <div className="hidden md:flex items-center gap-4">
              <span className="hover:text-white cursor-pointer transition-colors">My Account</span>
              <span className="hover:text-white cursor-pointer transition-colors">KES ▼</span>
           </div>
        </div>
      </div>
    </div>
  );
}
