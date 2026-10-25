export default function DestinationDetailsLoading() {
  return (
    <div className="mx-auto w-full max-w-7xl animate-pulse px-4 py-10 sm:px-6 md:py-14 lg:px-8">
      <div className="flex items-center justify-between gap-3">
        <div className="h-4 w-40 rounded bg-zinc-200" />
        <div className="flex gap-2">
          <div className="h-9 w-20 rounded-lg bg-zinc-200" />
          <div className="h-9 w-20 rounded-lg bg-zinc-200" />
        </div>
      </div>

      <div className="mt-6 aspect-[21/9] w-full rounded-xl bg-zinc-200" />

      <div className="mt-10 grid gap-8 lg:grid-cols-3">
        <div className="flex flex-col gap-4 lg:col-span-2">
          <div className="h-4 w-24 rounded bg-zinc-200" />
          <div className="h-12 w-2/3 rounded bg-zinc-200" />
          <div className="h-4 w-48 rounded bg-zinc-200" />

          <div className="mt-4 flex flex-col gap-2">
            <div className="h-4 w-28 rounded bg-zinc-200" />
            <div className="h-4 w-full rounded bg-zinc-200" />
            <div className="h-4 w-5/6 rounded bg-zinc-200" />
          </div>

          <div className="mt-4 flex flex-col gap-2">
            <div className="h-4 w-28 rounded bg-zinc-200" />
            <div className="h-4 w-full rounded bg-zinc-200" />
            <div className="h-4 w-5/6 rounded bg-zinc-200" />
          </div>

          <div className="mt-4 grid gap-2 sm:grid-cols-2">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="h-4 w-full rounded bg-zinc-200" />
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-4 rounded-xl bg-white p-6 ring-1 ring-zinc-200">
          <div className="h-4 w-24 rounded bg-zinc-200" />
          <div className="h-8 w-32 rounded bg-zinc-200" />
          <div className="h-4 w-20 rounded bg-zinc-200" />
          <div className="h-10 w-full rounded-lg bg-zinc-200" />
          <div className="h-10 w-full rounded-lg bg-zinc-200" />
          <div className="mt-2 flex flex-col gap-2 border-t border-zinc-100 pt-4">
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="h-4 w-full rounded bg-zinc-200" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
