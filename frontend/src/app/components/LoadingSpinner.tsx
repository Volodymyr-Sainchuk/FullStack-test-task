"use client";

export default function LoadingSpinner({ isLoading }: { isLoading: boolean }) {
  if (!isLoading) return null;
  return (
    <div className="flex justify-center items-center py-16">
      <div className="animate-spin rounded-full h-8 w-8 border-2 border-indigo-600 border-t-transparent"></div>
    </div>
  );
}
