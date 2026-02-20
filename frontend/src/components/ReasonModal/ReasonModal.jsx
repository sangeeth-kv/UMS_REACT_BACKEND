import React, { useState } from "react";
import { X } from "lucide-react";

function ReasonModal({
  open,
  title = "Provide a reason",
  placeholder = "Enter reason...",
  confirmText = "Continue",
  cancelText = "Cancel",
  onConfirm,
  onCancel,
}) {
  const [reason, setReason] = useState("");
  const [error, setError] = useState("");

  if (!open) return null;

  const handleConfirm = () => {
    if (!reason.trim()) {
      setError("Reason is required");
      return;
    }
    onConfirm(reason);
    setReason("");
    setError("");
    handleCancel()
  };

  const handleCancel = () => {
    setReason("");
    setError("");
    onCancel();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="relative w-full max-w-md rounded-2xl bg-white dark:bg-gray-800 shadow-2xl p-6">

        {/* Close */}
        <button
          onClick={handleCancel}
          className="absolute top-4 right-4 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          <X className="w-5 h-5 text-gray-600 dark:text-gray-300" />
        </button>

        {/* Title */}
        <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
          {title}
        </h3>

        {/* Textarea */}
        <div className="mt-4">
          <textarea
            rows={4}
            value={reason}
            onChange={(e) => {
              setReason(e.target.value);
              if (error) setError("");
            }}
            placeholder={placeholder}
            className="w-full rounded-lg border border-gray-300 dark:border-gray-600 
                       bg-white dark:bg-gray-700 p-3 text-sm text-gray-800 
                       dark:text-gray-200 focus:outline-none focus:ring-2 
                       focus:ring-blue-500"
          />

          {/* Error */}
          {error && (
            <p className="mt-1 text-xs text-red-500">{error}</p>
          )}
        </div>

        {/* Actions */}
        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={handleCancel}
            className="px-4 py-2 rounded-lg border border-gray-300 
                       dark:border-gray-600 text-gray-700 dark:text-gray-300
                       hover:bg-gray-100 dark:hover:bg-gray-700 transition"
          >
            {cancelText}
          </button>

          <button
            onClick={handleConfirm}
            className="px-4 py-2 rounded-lg bg-red-600 text-white 
                       hover:bg-red-700 transition"
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ReasonModal;
