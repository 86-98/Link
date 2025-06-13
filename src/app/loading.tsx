import LoadingSpinner from '@/components/LoadingSpinner';

export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-200px)]">
      <LoadingSpinner size={48} />
      <p className="ml-4 text-xl font-semibold text-foreground">Loading content...</p>
    </div>
  );
}
