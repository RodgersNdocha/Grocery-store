import { CATEGORIES } from '../data';
import { motion } from 'motion/react';

interface FiltersProps {
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
}

export function Filters({ selectedCategory, setSelectedCategory }: FiltersProps) {
  return (
    <div className="flex overflow-x-auto hide-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap gap-2 pb-2">
      {CATEGORIES.map((category) => (
        <button
          key={category}
          onClick={() => setSelectedCategory(category)}
          className={`px-4 py-2 rounded-full whitespace-nowrap text-sm font-medium transition-colors relative ${
            selectedCategory === category
              ? 'text-white'
              : 'bg-white text-gray-600 border border-gray-200 hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700'
          }`}
        >
          {selectedCategory === category && (
            <motion.div
              layoutId="activeCategory"
              className="absolute inset-0 bg-emerald-600 rounded-full -z-10"
              initial={false}
              transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
            />
          )}
          {category}
        </button>
      ))}
    </div>
  );
}
