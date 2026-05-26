"use client";

interface UndoSnackbarProps {
  snackbar: { message: string; onUndo: () => void } | null;
  onClose: () => void;
}

export default function UndoSnackbar({ snackbar, onClose }: UndoSnackbarProps) {
  if (!snackbar) return null;
  return (
    <div className="fixed bottom-6 right-6 bg-gray-900 border border-gray-800 text-white px-5 py-4 rounded-xl shadow-xl flex items-center gap-6 animate-fade-in z-50">
      <span className="text-sm font-medium text-gray-200">{snackbar.message}</span>
      <button
        onClick={() => {
          snackbar.onUndo();
          onClose();
        }}
        className="text-amber-400 font-bold hover:text-amber-300 text-xs tracking-wider uppercase transition"
      >
        Undo
      </button>
    </div>
  );
}
