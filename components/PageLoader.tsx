'use client';

type PageLoaderProps = {
  /** When true, fills remaining viewport under a typical header for a centered spinner. */
  fillViewport?: boolean;
};

export default function PageLoader({ fillViewport = true }: PageLoaderProps) {
  return (
    <div
      className={`flex w-full items-center justify-center ${
        fillViewport ? 'min-h-[calc(100vh-11rem)]' : 'min-h-[40vh] py-16'
      }`}
      role="status"
      aria-live="polite"
      aria-label="Loading"
    >
      <div className="h-12 w-12 shrink-0 animate-spin rounded-full border-4 border-gray-200 border-t-[#2867AE]" />
    </div>
  );
}
