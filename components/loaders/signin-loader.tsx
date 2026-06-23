export default function SignInLoader() {
  return (
    <div className="fixed inset-0 z-[9998] flex min-h-screen">
      {/* Left panel */}
      <div className="hidden lg:flex lg:w-1/2 h-screen bg-authBg flex-col items-center justify-center gap-6 px-16">
        <div className="h-64 w-full rounded-2xl bg-gray-200 animate-pulse" />
        <div className="h-6 w-3/4 rounded-md bg-gray-200 animate-pulse" />
        <div className="h-4 w-1/2 rounded-md bg-gray-200 animate-pulse" />
      </div>

      {/* Right panel */}
      <div className="flex w-full lg:w-1/2 min-h-screen bg-authBg items-center justify-center px-4 py-10 sm:px-6 sm:py-14">
        <div className="w-full max-w-[465px] space-y-10">
          <div className="space-y-3">
            <div className="h-10 w-44 rounded-lg bg-gray-200 animate-pulse" />
            <div className="h-5 w-28 rounded-md bg-gray-200 animate-pulse" />
            <div className="h-4 w-52 rounded-md bg-gray-200 animate-pulse" />
          </div>

          <div className="space-y-5">
            <div className="space-y-1.5">
              <div className="h-4 w-10 rounded-md bg-gray-200 animate-pulse" />
              <div className="h-11 w-full rounded-lg bg-gray-200 animate-pulse" />
            </div>
            <div className="space-y-1.5">
              <div className="h-4 w-16 rounded-md bg-gray-200 animate-pulse" />
              <div className="h-11 w-full rounded-lg bg-gray-200 animate-pulse" />
            </div>
            <div className="flex justify-end">
              <div className="h-4 w-28 rounded-md bg-gray-200 animate-pulse" />
            </div>
          </div>

          <div className="h-12 w-full rounded-[20px] bg-gray-200 animate-pulse" />
        </div>
      </div>
    </div>
  );
}
