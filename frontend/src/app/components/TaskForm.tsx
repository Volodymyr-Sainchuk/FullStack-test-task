"use client";

import { useState } from "react";
import axios from "axios";

interface TaskFormProps {
  categories: string[];
  onTaskAdded: (task: any) => void;
}

export default function TaskForm({ categories, onTaskAdded }: TaskFormProps) {
  const [text, setText] = useState("");
  const [category, setCategory] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleButtonClick = async () => {
    if (!text.trim()) {
      setError("Please enter task text.");
      return;
    }
    if (!category) {
      setError("Please select a category.");
      return;
    }

    try {
      setIsSubmitting(true);
      setError(null);

      const response = await axios.post(`/todos`, {
        text: text.trim(),
        category,
      });

      onTaskAdded(response.data);
      setText("");
    } catch (err: any) {
      console.error("Error:", err);
      setError(err.response?.data?.message || "Failed to create task.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-4">
      {error && (
        <div className="text-xs text-red-500 font-medium bg-red-50 p-2 rounded-lg border border-red-100">{error}</div>
      )}

      <div className="flex flex-col md:flex-row gap-3">
        <input
          type="text"
          placeholder="What needs to be done?"
          value={text}
          onChange={(e) => setText(e.target.value)}
          disabled={isSubmitting}
          className="flex-1 px-4 py-2 border border-gray-300 rounded-xl text-sm focus:outline-none focus:border-indigo-500 disabled:bg-gray-50 text-gray-900"
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          disabled={isSubmitting}
          className="px-4 py-2 border border-gray-300 rounded-xl text-sm focus:outline-none focus:border-indigo-500 disabled:bg-gray-50 text-gray-900"
        >
          <option value="" disabled>
            Select Category
          </option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        <button
          type="button"
          onClick={handleButtonClick}
          disabled={isSubmitting}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-xl text-sm font-semibold transition disabled:bg-indigo-400 flex items-center justify-center gap-2 min-w-[110px]"
        >
          {isSubmitting ? (
            <>
              <div className="rounded-full h-4 w-4 border-2 border-white border-t-transparent animate-spin"></div>
              <span>Adding...</span>
            </>
          ) : (
            "Add Task"
          )}
        </button>
      </div>
    </div>
  );
}
