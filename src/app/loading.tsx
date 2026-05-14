export default function Loading() {
  return (
    <div className="py-12">
      <div className="max-w-[1320px] mx-auto px-6">
        {/* Hero skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8 mb-12">
          <div className="skeleton h-[480px] rounded-lg" />
          <div className="flex flex-col gap-4">
            <div className="skeleton h-24 rounded" />
            <div className="skeleton h-24 rounded" />
            <div className="skeleton h-24 rounded" />
          </div>
        </div>

        {/* Cards skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i}>
              <div className="skeleton h-48 rounded mb-3" />
              <div className="skeleton h-3 w-16 mb-2" />
              <div className="skeleton h-5 w-full mb-1" />
              <div className="skeleton h-5 w-3/4 mb-2" />
              <div className="skeleton h-3 w-24" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
