import { Skeleton } from './loading-skeleton';

interface PageLoadingProps {
  variant?: 'default' | 'form' | 'gallery' | 'content';
}

export function PageLoading({ variant = 'default' }: PageLoadingProps) {
  if (variant === 'form') {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <Skeleton className="h-12 w-3/4 mx-auto" />
            <Skeleton className="h-6 w-1/2 mx-auto" />
          </div>

          {/* Form sections */}
          <div className="space-y-6">
            {[1, 2, 3].map(section => (
              <div
                key={section}
                className="bg-white rounded-lg border p-6 space-y-4"
              >
                <Skeleton className="h-8 w-1/3" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Skeleton className="h-10 w-full" />
                  <Skeleton className="h-10 w-full" />
                </div>
                <Skeleton className="h-24 w-full" />
              </div>
            ))}
          </div>

          {/* Submit button */}
          <div className="flex justify-center">
            <Skeleton className="h-12 w-32" />
          </div>
        </div>
      </div>
    );
  }

  if (variant === 'gallery') {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <Skeleton className="h-12 w-1/2 mx-auto" />
            <Skeleton className="h-6 w-3/4 mx-auto" />
          </div>

          {/* Gallery grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 12 }).map((_, i) => (
              <Skeleton key={i} className="aspect-square w-full" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (variant === 'content') {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <Skeleton className="h-12 w-2/3 mx-auto" />
            <Skeleton className="h-6 w-1/2 mx-auto" />
          </div>

          {/* Content sections */}
          <div className="space-y-6">
            {[1, 2, 3, 4].map(section => (
              <div key={section} className="space-y-4">
                <Skeleton className="h-8 w-1/3" />
                <div className="space-y-3">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-5/6" />
                  <Skeleton className="h-4 w-4/5" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Default loading skeleton
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="space-y-8">
        {/* Hero section */}
        <div className="text-center space-y-6">
          <Skeleton className="h-16 w-3/4 mx-auto" />
          <Skeleton className="h-6 w-1/2 mx-auto" />
          <div className="flex justify-center space-x-4">
            <Skeleton className="h-12 w-32" />
            <Skeleton className="h-12 w-32" />
          </div>
        </div>

        {/* Content sections */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {[1, 2, 3].map(card => (
            <div key={card} className="space-y-4">
              <Skeleton className="h-48 w-full" />
              <Skeleton className="h-6 w-3/4" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
              </div>
            </div>
          ))}
        </div>

        {/* Additional content */}
        <div className="space-y-6">
          <Skeleton className="h-8 w-1/3" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
              <Skeleton className="h-4 w-4/5" />
            </div>
            <div className="space-y-3">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
              <Skeleton className="h-4 w-4/5" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
