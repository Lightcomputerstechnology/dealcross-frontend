// File: src/components/LoadingFallback.jsx

export default function LoadingFallback() {
  return (
    <div
      className="h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-950 text-gray-500"
      role="status"
      aria-label="Loading content"
    >
      <span className="text-sm animate-pulse">Loading...</span>
    </div>
  );
}