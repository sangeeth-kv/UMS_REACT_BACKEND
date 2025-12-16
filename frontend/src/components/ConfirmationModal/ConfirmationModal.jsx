import React from "react";
import { X } from "lucide-react";

function ConfirmationModal({
  open,
  title = "Are you sure?",
  message = "Do you want to continue?",
  confirmText = "Confirm",
  cancelText = "Cancel",
  onConfirm,
  onCancel,
  danger = false,
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center 
                    bg-black/40 backdrop-blur-sm p-4">

      <div className="relative w-full max-w-md 
                      rounded-2xl bg-white dark:bg-gray-800 
                      shadow-2xl p-6">

        {/* Close Icon */}
        <button
          onClick={onCancel}
          className="absolute top-4 right-4 p-1 rounded-full
                     hover:bg-gray-100 dark:hover:bg-gray-700 transition"
        >
          <X className="w-5 h-5 text-gray-600 dark:text-gray-300" />
        </button>

        {/* Title */}
        <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
          {title}
        </h3>

        {/* Message */}
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
          {message}
        </p>

        {/* Actions */}
        <div className="mt-6 flex justify-end gap-3">

          <button
            onClick={onCancel}
            className="px-4 py-2 rounded-lg border border-gray-300 
                       dark:border-gray-600 text-gray-700 dark:text-gray-300
                       hover:bg-gray-100 dark:hover:bg-gray-700 transition"
          >
            {cancelText}
          </button>

          <button
            onClick={onConfirm}
            className={`px-4 py-2 rounded-lg text-white transition
              ${
                danger
                  ? "bg-red-600 hover:bg-red-700"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
          >
            {confirmText}
          </button>

        </div>
      </div>
    </div>
  );
}

export default ConfirmationModal;
