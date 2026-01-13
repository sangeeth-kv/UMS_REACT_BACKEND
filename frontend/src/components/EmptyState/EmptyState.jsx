import { FaceFrownIcon } from "@heroicons/react/24/outline";

export default function EmptyState({
  title = "No Data Found",
  description = "Try adjusting your search",
}) {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <FaceFrownIcon className="w-20 h-20 text-gray-400 dark:text-gray-500" />

      <h3 className="mt-4 text-lg font-semibold text-gray-700 dark:text-gray-200">
        {title}
      </h3>

      <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
        {description}
      </p>
    </div>
  );
}
