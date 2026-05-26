"use client";

import { useEffect, useState } from "react";
import { FiCheck } from "react-icons/fi";
import { Todo } from "../(todos)/TodoPageClient";


interface Props {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onBulkCheck: (id: string, checked: boolean) => void;
  isSelected: boolean;
}

export default function TaskItem({ todo, onToggle, onDelete, onBulkCheck, isSelected }: Props) {
  const [createdAtLabel, setCreatedAtLabel] = useState("");

  useEffect(() => {
    setCreatedAtLabel(
      new Date(todo.createdAt).toLocaleString(undefined, {
        dateStyle: "medium",
        timeStyle: "short",
      }),
    );
  }, [todo.createdAt]);

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

        {/* 2. Completion: icon button + task text */}
        <div className="flex items-center gap-3 flex-1 overflow-hidden group">
          <button
            type="button"
            onClick={() => onToggle(todo.id)}
            disabled={todo.completed}
            className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 transition focus:outline-none focus:ring-2 focus:ring-emerald-500/30 ${
              todo.completed
                ? "border-emerald-500 bg-emerald-500 text-white cursor-default"
                : "border-gray-300 bg-white text-gray-500 hover:border-emerald-500 hover:bg-emerald-50 hover:text-emerald-600"
            }`}
            aria-label="Mark task as completed"
          >
            <FiCheck className="h-4 w-4" strokeWidth={3} />
          </button>

          <div className="overflow-hidden flex-1">
            {/* Task text changes style dramatically based on completion */}
            <p
              className={`text-sm font-semibold transition-all duration-300 truncate ${
                todo.completed ? "line-through text-gray-400 italic" : "text-gray-800 group-hover:text-gray-900"
              }`}
            >
              {todo.text}
            </p>

            <div className="mt-1 flex flex-wrap items-center gap-2">
              <span
                className={`inline-block px-2 py-0.5 text-[10px] font-bold rounded uppercase tracking-wider transition-colors duration-300 ${
                  todo.completed ? "bg-emerald-100/50 text-emerald-700" : "bg-gray-100 text-gray-600"
                }`}
              >
                {todo.category}
              </span>
              <span
                className={`text-[10px] transition-colors duration-300 ${
                  todo.completed ? "text-gray-400" : "text-gray-500"
                }`}
              >
                {createdAtLabel}
              </span>
            </div>
          </div>
        </div>
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
