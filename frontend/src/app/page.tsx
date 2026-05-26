"use client";

import { useEffect, useState, useRef } from "react";
import axios from "axios";
import TaskForm from "./components/TaskForm";
import TaskItem from "./components/TaskItem";
import TaskFilters from "./components/TaskFilters";

export interface Todo {
  id: string;
  text: string;
  category: string;
  completed: boolean;
}

export interface Category {
  id: string;
  name: string;
}

const API_BASE = `${process.env.NEXT_PUBLIC_API_URL || "https://fullstack-test-task-1-xvql.onrender.com"}/api`;

export default function TodoPage() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [loading, setLoading] = useState<boolean>(true);
  const [globalError, setGlobalError] = useState<string | null>(null);

  const [snackbar, setSnackbar] = useState<{ message: string; onUndo: () => void } | null>(null);
  const snackbarTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const [selectedTodoIds, setSelectedTodoIds] = useState<string[]>([]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [todosRes, catsRes] = await Promise.all([
        axios.get(`${API_BASE}/todos`),
        axios.get(`${API_BASE}/categories`),
      ]);
      setTodos(todosRes.data);
      setCategories(catsRes.data.map((c: Category) => c.name));
      setGlobalError(null);
    } catch (err) {
      setGlobalError("Failed to synchronize with the backend service.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const triggerSnackbar = (message: string, onUndo: () => void) => {
    if (snackbarTimeoutRef.current) clearTimeout(snackbarTimeoutRef.current);
    setSnackbar({ message, onUndo });

    snackbarTimeoutRef.current = setTimeout(() => {
      setSnackbar(null);
    }, 5000);
  };

  const handleToggleComplete = (id: string) => {
    const targetTodo = todos.find((t) => t.id === id);
    if (!targetTodo) return;

    setTodos((prev) => prev.map((t) => (t.id === id ? { ...t, completed: true } : t)));
    let isUndone = false;

    triggerSnackbar(`Task marked as completed.`, () => {
      isUndone = true;
      setTodos((prev) => prev.map((t) => (t.id === id ? { ...t, completed: false } : t)));
    });

    setTimeout(async () => {
      if (!isUndone) {
        try {
          await axios.patch(`${API_BASE}/todos/${id}`, { completed: true });
          setTodos((prev) => prev.filter((t) => t.id !== id));
        } catch (err) {
          setGlobalError("Failed to update task status.");
          setTodos((prev) => prev.map((t) => (t.id === id ? { ...t, completed: false } : t)));
        }
      }
    }, 5000);
  };

  const handleDeleteTask = (id: string) => {
    const targetTodo = todos.find((t) => t.id === id);
    if (!targetTodo) return;

    setTodos((prev) => prev.filter((t) => t.id !== id));
    let isUndone = false;

    triggerSnackbar("Task deleted successfully.", () => {
      isUndone = true;
      setTodos((prev) => [...prev, targetTodo]);
    });

    setTimeout(async () => {
      if (!isUndone) {
        try {
          await axios.delete(`${API_BASE}/todos/${id}`);
        } catch (err) {
          setGlobalError("Could not process task removal on backend.");
          setTodos((prev) => [...prev, targetTodo]);
        }
      }
    }, 5000);
  };

  const handleBulkComplete = () => {
    const idsToProcess = [...selectedTodoIds];
    const originalTodos = [...todos];

    setTodos((prev) => prev.map((t) => (idsToProcess.includes(t.id) ? { ...t, completed: true } : t)));
    setSelectedTodoIds([]);
    let isUndone = false;

    triggerSnackbar(`Bulk operations activated for ${idsToProcess.length} items.`, () => {
      isUndone = true;
      setTodos(originalTodos);
    });

    setTimeout(async () => {
      if (!isUndone) {
        try {
          await Promise.all(idsToProcess.map((id) => axios.patch(`${API_BASE}/todos/${id}`, { completed: true })));
          setTodos((prev) => prev.filter((t) => !idsToProcess.includes(t.id)));
        } catch (err) {
          setGlobalError("Bulk update failed execution lifecycle.");
          setTodos(originalTodos);
        }
      }
    }, 5000);
  };

  const handleSelectTodo = (id: string, checked: boolean) => {
    setSelectedTodoIds((prev) => (checked ? [...prev, id] : prev.filter((x) => x !== id)));
  };

  const filteredTodos = todos.filter((t) => selectedCategory === "All" || t.category === selectedCategory);

  return (
    <main className="max-w-3xl mx-auto p-6 min-h-screen pb-24">
      <h1 className="text-3xl font-extrabold mb-8 text-gray-900 tracking-tight">Workspace Management Console</h1>

      {globalError && (
        <div className="bg-red-50 border border-red-200 text-red-600 p-4 rounded-xl mb-6 text-sm font-medium">
          {globalError}
        </div>
      )}

      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200/80 mb-8">
        <h2 className="text-base font-semibold text-gray-800 mb-4">Create New Action Item</h2>
        <TaskForm categories={categories} onTaskAdded={(newTask) => setTodos((prev) => [newTask, ...prev])} />
      </div>

      <div className="mb-6 flex justify-between items-center bg-gray-50 p-3 rounded-xl border border-gray-100">
        <TaskFilters categories={categories} selected={selectedCategory} onSelect={setSelectedCategory} />
        {selectedTodoIds.length > 0 && (
          <button
            onClick={handleBulkComplete}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-xs font-semibold transition shadow-sm shadow-indigo-200"
          >
            Mark Selected Done ({selectedTodoIds.length})
          </button>
        )}
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-16">
          <div className="animate-spin rounded-full h-8 w-8 border-2 border-indigo-600 border-t-transparent"></div>
        </div>
      ) : filteredTodos.length === 0 ? (
        <div className="text-center py-16 border border-dashed border-gray-300 rounded-xl bg-gray-50/50">
          <p className="text-sm text-gray-500 font-medium">No active tasks available matching criteria.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredTodos.map((todo) => (
            <TaskItem
              key={todo.id}
              todo={todo}
              onToggle={handleToggleComplete}
              onDelete={handleDeleteTask}
              onBulkCheck={handleSelectTodo}
              isSelected={selectedTodoIds.includes(todo.id)}
            />
          ))}
        </div>
      )}

      {snackbar && (
        <div className="fixed bottom-6 right-6 bg-gray-900 border border-gray-800 text-white px-5 py-4 rounded-xl shadow-xl flex items-center gap-6 animate-fade-in z-50">
          <span className="text-sm font-medium text-gray-200">{snackbar.message}</span>
          <button
            onClick={() => {
              snackbar.onUndo();
              setSnackbar(null);
            }}
            className="text-amber-400 font-bold hover:text-amber-300 text-xs tracking-wider uppercase transition"
          >
            Undo
          </button>
        </div>
      )}
    </main>
  );
}
