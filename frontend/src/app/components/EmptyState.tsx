"use client";

export default function EmptyState({ show }: { show: boolean }) {
  if (!show) return null;
  return (
    <div className="text-center py-16 border border-dashed border-gray-300 rounded-xl bg-gray-50/50">
      <p className="text-sm text-gray-500 font-medium">No active tasks available matching criteria.</p>
    </div>
  );
}
