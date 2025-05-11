function LoadingSkeleton() {
  return (
    <div className="movie-card animate-pulse">
      <div className="bg-gray-300 dark:bg-gray-700 aspect-[2/3] rounded-t-lg"></div>
      <div className="p-4">
        <div className="h-5 bg-gray-300 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/4"></div>
      </div>
    </div>
  );
}

export default LoadingSkeleton;