export type SignInLoaderVariant = "signin" | "forgot-password" | "reset-password";

interface SignInLoaderProps {
  variant?: SignInLoaderVariant;
}

function FieldSkeleton({ labelWidth = "w-10" }: { labelWidth?: string }) {
  return (
    <div className="flex flex-col gap-1">
      <div className={`h-[18px] ${labelWidth} rounded-md bg-gray-200 animate-pulse`} />
      <div className="h-[48px] w-full rounded-lg bg-gray-200 animate-pulse" />
    </div>
  );
}

export default function SignInLoader({ variant = "signin" }: SignInLoaderProps) {
  return (
    <div className="fixed inset-0 z-[9998] flex min-h-screen">
      {/* Left panel — big rectangle sized to the Lottie animation's own bounds */}
      <div className="hidden lg:flex lg:h-screen lg:w-[60%] overflow-hidden bg-authBg">
        <div className="h-full w-full bg-gray-200 animate-pulse" />
      </div>

      {/* Right panel — mirrors the form for the active auth page */}
      <div className="flex w-full lg:w-[48%] min-h-screen bg-authBg items-center justify-center px-4 py-10 sm:px-6 sm:py-14">
        <div className="w-full max-w-[465px] flex flex-col gap-10">
          {variant === "signin" ? (
            <>
              <div>
                <div className="h-[48px] w-44 rounded-lg bg-gray-200 animate-pulse" />
                <div className="mt-4 h-[30px] w-28 rounded-md bg-gray-200 animate-pulse" />
                <div className="mt-1 h-[18px] w-52 rounded-md bg-gray-200 animate-pulse" />
              </div>

              <div className="flex flex-col gap-5">
                <FieldSkeleton labelWidth="w-10" />
                <FieldSkeleton labelWidth="w-16" />
                <div className="flex justify-end">
                  <div className="h-4 w-28 rounded-md bg-gray-200 animate-pulse" />
                </div>
                <div className="pt-3">
                  <div className="h-11 w-28 rounded-lg bg-gray-200 animate-pulse" />
                </div>
              </div>
            </>
          ) : variant === "forgot-password" ? (
            <>
              <div className="flex flex-col gap-4">
                <div className="h-[48px] w-44 rounded-lg bg-gray-200 animate-pulse" />
                <div className="flex flex-col gap-1">
                  <div className="h-[30px] w-36 rounded-md bg-gray-200 animate-pulse" />
                  <div className="h-[18px] w-full rounded-md bg-gray-200 animate-pulse" />
                  <div className="h-[18px] w-3/4 rounded-md bg-gray-200 animate-pulse" />
                </div>
              </div>

              <div className="flex flex-col gap-10">
                <FieldSkeleton labelWidth="w-10" />
                <div className="flex flex-col gap-2">
                  <div className="h-12 w-full rounded-[20px] bg-gray-200 animate-pulse" />
                  <div className="mx-auto h-4 w-32 rounded-md bg-gray-200 animate-pulse" />
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="flex flex-col gap-4">
                <div className="h-[48px] w-44 rounded-lg bg-gray-200 animate-pulse" />
                <div className="flex flex-col gap-1">
                  <div className="h-[30px] w-36 rounded-md bg-gray-200 animate-pulse" />
                  <div className="h-[18px] w-full rounded-md bg-gray-200 animate-pulse" />
                  <div className="h-[18px] w-2/3 rounded-md bg-gray-200 animate-pulse" />
                </div>
              </div>

              <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-1">
                  <div className="h-[18px] w-28 rounded-md bg-gray-200 animate-pulse" />
                  <div className="h-[48px] w-full rounded-lg bg-gray-200 animate-pulse" />
                  <div className="h-4 w-full rounded-md bg-gray-200 animate-pulse" />
                </div>
                <FieldSkeleton labelWidth="w-32" />
                <div className="flex flex-col gap-2 pt-2">
                  <div className="h-12 w-full rounded-[20px] bg-gray-200 animate-pulse" />
                  <div className="mx-auto h-4 w-32 rounded-md bg-gray-200 animate-pulse" />
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
