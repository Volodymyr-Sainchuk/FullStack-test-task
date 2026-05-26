import TodoPageClient, { type Todo } from "./TodoPageClient";
import { api } from "../../lib/api";

async function getInitialData(): Promise<{
  todos: Todo[];
  categories: string[];
  error: string | null;
}> {
  try {
    const [todosRes, categoriesRes] = await Promise.all([
      api.get<Todo[]>("/todos"),
      api.get<{ name: string }[]>("/categories"),
    ]);

    const categories = categoriesRes.data.map((category) => category.name);

    return { todos: todosRes.data, categories, error: null };
  } catch {
    return {
      todos: [],
      categories: [],
      error: "Failed to synchronize with the backend service.",
    };
  }
}

export default async function Page() {
  const { todos, categories, error } = await getInitialData();

  return (
    <TodoPageClient initialTodos={todos} initialCategories={categories} initialError={error} />
  );
}
