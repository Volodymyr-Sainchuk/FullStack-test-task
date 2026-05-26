"use client";

export default function GlobalError({ message }: { message: string | null }) {
  if (!message) return null;
  return (
    <div className="bg-red-50 border border-red-200 text-red-600 p-4 rounded-xl mb-6 text-sm font-medium animate-shake">
      {message}
    </div>
  );
}
