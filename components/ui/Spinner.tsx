export function Spinner({ className = "" }: { className?: string }) {
  return (
    <div
      className={`animate-spin rounded-full border-2 border-gray-700 border-t-blue-500 ${className}`}
      style={{ width: "1.25rem", height: "1.25rem" }}
      aria-label="Loading"
    />
  );
}
