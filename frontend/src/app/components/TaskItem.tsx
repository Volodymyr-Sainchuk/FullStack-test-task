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
      className={`flex items-center justify-between p-4 bg-white border rounded-xl transition-all duration-300 ${
        todo.completed
          ? "border-emerald-100 bg-emerald-50/20 bg-gradient-to-r from-emerald-50/10 to-transparent"
          : "border-gray-200 hover:border-gray-300 shadow-sm"
      }`}
    >
      <div className="flex items-center gap-4 flex-1">
        {/* 1. Bulk Action Box (Square) */}
        <div className="flex items-center" title="Select for bulk action">
          <input
            type="checkbox"
            checked={isSelected}
            onChange={(e) => onBulkCheck(todo.id, e.target.checked)}
            disabled={todo.completed} // Disable multi-select if already completed
            className="h-4 w-4 rounded text-indigo-600 border-gray-300 focus:ring-indigo-500/20 transition cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
          />
        </div>

        {/* Visual separator line between features */}
        <div className="h-5 w-[1px] bg-gray-200"></div>

        {/* 2. THE COMPLETION CONTAINER (Clickable Text + Circle Checkbox) */}
        <label className="flex items-center gap-3 flex-1 overflow-hidden cursor-pointer select-none group">
          {/* Circular Completion Checkbox */}
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => onToggle(todo.id)}
            className="h-5 w-5 rounded-full text-emerald-600 border-gray-400 focus:ring-emerald-500/20 transition cursor-pointer"
            aria-label="Toggle completed status"
          />

          <div className="overflow-hidden flex-1">
            {/* Task text changes style dramatically based on completion */}
            <p
              className={`text-sm font-semibold transition-all duration-300 truncate ${
                todo.completed ? "line-through text-gray-400 italic" : "text-gray-800 group-hover:text-gray-900"
              }`}
            >
              {todo.text}
            </p>

            <span
              className={`inline-block mt-1 px-2 py-0.5 text-[10px] font-bold rounded uppercase tracking-wider transition-colors duration-300 ${
                todo.completed ? "bg-emerald-100/50 text-emerald-700" : "bg-gray-100 text-gray-600"
              }`}
            >
              {todo.category}
            </span>
          </div>
        </label>
      </div>

      {/* Delete Action Trigger */}
      <button
        onClick={() => onDelete(todo.id)}
        className="text-gray-400 hover:text-red-500 text-sm p-2 transition ml-4 rounded-lg hover:bg-gray-50"
        title="Delete Item"
      >
        ✕
      </button>
    </div>
  );
}
