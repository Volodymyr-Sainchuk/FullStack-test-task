"use client";

import { useRef, useState } from "react";
import { api } from "../../lib/api";
import TaskForm from "../components/TaskForm";
import TaskItem from "../components/TaskItem";
import TaskFilters from "../components/TaskFilters";
import BulkActionButton from "../components/BulkActionButton";
import GlobalError from "../components/GlobalError";
import EmptyState from "../components/EmptyState";
import UndoSnackbar from "../components/UndoSnackbar";

export interface Todo {
  id: string;
  text: string;
  category: string;
  completed: boolean;
  createdAt: string;
}

interface TodoPageClientProps {
  initialTodos: Todo[];
  initialCategories: string[];
  initialError: string | null;
}

export default function TodoPageClient({
  initialTodos,
  initialCategories,
  initialError,
}: TodoPageClientProps) {
  const [todos, setTodos] = useState<Todo[]>(initialTodos);
  const [categories, setCategories] = useState<string[]>(initialCategories);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [globalError, setGlobalError] = useState<string | null>(initialError);

  const [snackbar, setSnackbar] = useState<{ message: string; onUndo: () => void } | null>(null);
  const snackbarTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const [selectedTodoIds, setSelectedTodoIds] = useState<string[]>([]);

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
          await api.patch(`/todos/${id}`, { completed: true });
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
          await api.delete(`/todos/${id}`);
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
          await Promise.all(idsToProcess.map((id) => api.patch(`/todos/${id}`, { completed: true })));
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

      <GlobalError message={globalError} />

      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200/80 mb-8">
        <h2 className="text-base font-semibold text-gray-800 mb-4">Create New Action Item</h2>
        <TaskForm categories={categories} onTaskAdded={(newTask) => setTodos((prev) => [newTask, ...prev])} />
      </div>

      <div className="mb-6 flex justify-between items-center bg-gray-50 p-3 rounded-xl border border-gray-100 gap-4">
        <TaskFilters categories={categories} selected={selectedCategory} onSelect={setSelectedCategory} />
        <BulkActionButton selectedCount={selectedTodoIds.length} onBulkComplete={handleBulkComplete} />
      </div>

      <EmptyState show={filteredTodos.length === 0} />

      {filteredTodos.length > 0 && (
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
      <UndoSnackbar snackbar={snackbar} onClose={() => setSnackbar(null)} />
    </main>
  );
}
