"use client";

import { useForm } from "react-hook-form";
import axios from "axios";
import { useState } from "react";
import { Todo } from "../page";

interface FormInputs {
  text: string;
  category: string;
}

interface Props {
  categories: string[];
  onTaskAdded: (task: Todo) => void;
}

export default function TaskForm({ categories, onTaskAdded }: Props) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormInputs>();
  const [submitError, setSubmitError] = useState<string | null>(null);

  const onSubmit = async (data: FormInputs) => {
    try {
      setSubmitError(null);
      const res = await axios.post("http://localhost:5000/api/todos", data);
      onTaskAdded(res.data);
      reset({ text: "", category: data.category });
    } catch (err: any) {
      if (err.response && err.response.status === 400) {
        setSubmitError(err.response.data.message || err.response.data.error);
      } else {
        setSubmitError("An unexpected server communication error occurred.");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2">
          <input
            {...register("text", { required: "Task field text description cannot be blank" })}
            placeholder="Specify task instructions..."
            className="w-full px-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition text-gray-800"
          />
          {errors.text && <p className="text-red-500 text-xs mt-1 font-medium">{errors.text.message}</p>}
        </div>

        <div>
          <select
            {...register("category", { required: "Please map a category definition" })}
            className="w-full px-4 py-2 text-sm border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition text-gray-700"
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          {errors.category && <p className="text-red-500 text-xs mt-1 font-medium">{errors.category.message}</p>}
        </div>
      </div>

      {submitError && (
        <div className="text-red-600 bg-red-50 text-xs font-semibold px-3 py-2 rounded-lg border border-red-100">
          ⚠️ {submitError}
        </div>
      )}

      <button
        type="submit"
        className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-lg text-sm font-semibold transition shadow-sm"
      >
        Add Task
      </button>
    </form>
  );
}
