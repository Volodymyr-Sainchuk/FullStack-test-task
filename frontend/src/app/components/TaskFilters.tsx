"use client";

interface Props {
  categories: string[];
  selected: string;
  onSelect: (category: string) => void;
}

export default function TaskFilters({ categories, selected, onSelect }: Props) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Filter By:</span>
      <select
        value={selected}
        onChange={(e) => onSelect(e.target.value)}
        className="border border-gray-300 rounded-lg px-3 py-1.5 bg-white text-xs font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-gray-700 transition"
      >
        <option value="All">All Categories</option>
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>
    </div>
  );
}
