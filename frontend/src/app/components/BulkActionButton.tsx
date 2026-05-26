"use client";

interface BulkActionButtonProps {
  selectedCount: number;
  onBulkComplete: () => void;
}

export default function BulkActionButton({ selectedCount, onBulkComplete }: BulkActionButtonProps) {
  if (selectedCount === 0) return null;

  return (
    <button
      onClick={onBulkComplete}
      className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-xs font-semibold transition shadow-sm shadow-indigo-200 shrink-0"
    >
      Mark Selected Done ({selectedCount})
    </button>
  );
}
