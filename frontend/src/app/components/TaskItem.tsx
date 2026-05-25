"use client";

import { Todo } from "../page";

interface Props {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onBulkCheck: (id: string, checked: boolean) => void;
  isSelected: boolean;
}

export default function TaskItem({ todo, onToggle, onDelete, onBulkCheck, isSelected }: Props) {
  return (
    <div
      className={`flex items-center justify-between p-4 bg-white border border-gray-200 rounded-xl transition-all duration-300 ${todo.completed ? "opacity-30 pointer-events-none scale-95" : "hover:border-gray-300"}`}
    >
      <div className="flex items-center gap-4 flex-1">
        {/* Bulk Action Processing Box (Bonus Feature) */}
        <input
          type="checkbox"
          checked={isSelected}
          onChange={(e) => onBulkCheck(todo.id, e.target.checked)}
          className="h-4 w-4 rounded text-indigo-600 border-gray-300 focus:ring-indigo-500/20 transition"
        />

        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo.id)}
          className="h-5 w-5 rounded-full text-green-600 border-gray-300 focus:ring-green-500 transition cursor-pointer"
        />

        <div className="overflow-hidden">
          <p className="text-sm font-semibold text-gray-800 truncate">{todo.text}</p>
          <span className="inline-block mt-1 px-2 py-0.5 bg-gray-100 text-gray-600 text-[10px] font-bold rounded uppercase tracking-wider">
            {todo.category}
          </span>
        </div>
      </div>

      <button
        onClick={() => onDelete(todo.id)}
        className="text-gray-400 hover:text-red-500 text-sm p-2 transition ml-4"
        title="Delete Item"
      >
        ✕
      </button>
    </div>
  );
}
