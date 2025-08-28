/**
 * ErrorMessage Component
 * 
 * Displays an error message in a styled alert box with an optional retry button.
 * 
 * @param {Object} props
 * @param {string} props.message - The error message to display (defaults to "Something went wrong.")
 * @param {Function} props.onRetry - Optional callback function for retry action
 */
export default function ErrorMessage({ message = "Something went wrong.", onRetry }) {
  return (
    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
      <div className="flex items-start justify-between gap-4">
        <p className="text-sm">{message}</p>
        {onRetry && (
          <button
            onClick={onRetry}
            className="text-sm font-medium text-red-700 underline underline-offset-2 hover:text-red-800"
          >
            Retry
          </button>
        )}
      </div>
    </div>
  );
}


