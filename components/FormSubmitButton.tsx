'use client';

type FormSubmitButtonProps = {
  isLoading: boolean;
  idleLabel: string;
  loadingLabel: string;
  className: string;
};

function Spinner({ className }: { className?: string }) {
  return (
    <svg
      className={`h-6 w-6 shrink-0 animate-spin ${className ?? ''}`}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      aria-hidden
    >
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path
        className="opacity-90"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );
}

export default function FormSubmitButton({
  isLoading,
  idleLabel,
  loadingLabel,
  className,
}: FormSubmitButtonProps) {
  return (
    <button
      type="submit"
      disabled={isLoading}
      aria-busy={isLoading}
      aria-live="polite"
      className={`inline-flex min-h-[3.25rem] w-full items-center justify-center gap-3 font-semibold transition disabled:cursor-wait ${
        isLoading ? 'ring-2 ring-white/70 ring-offset-2 ring-offset-transparent' : ''
      } ${className}`}
    >
      {isLoading ? (
        <>
          <Spinner />
          <span>{loadingLabel}</span>
        </>
      ) : (
        <span>{idleLabel}</span>
      )}
    </button>
  );
}
