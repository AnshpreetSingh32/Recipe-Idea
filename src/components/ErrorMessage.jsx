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


