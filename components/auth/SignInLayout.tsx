"use client";

import Image from "next/image";
import { type ReactNode, useState, useEffect, useCallback } from "react";
import LottieBackground from "@/components/auth/LottieBackground";
import SignInLoader from "@/components/loaders/signin-loader";

type SignInLayoutProps = {
  children: ReactNode;
  animationPath: string;
};

export default function SignInLayout({ children, animationPath }: SignInLayoutProps) {
  const [ready, setReady] = useState(false);
  const handleReady = useCallback(() => setReady(true), []);

  useEffect(() => {
    if (window.innerWidth < 1024) {
      setReady(true);
      return;
    }

    const handlePageShow = (e: PageTransitionEvent) => {
      if (e.persisted) setReady(true);
    };
    window.addEventListener("pageshow", handlePageShow);
    return () => window.removeEventListener("pageshow", handlePageShow);
  }, []);

  return (
    <>
      {!ready && <SignInLoader />}
      <main className="relative min-h-screen w-full bg-stone">
        <div className="flex min-h-screen flex-col lg:flex-row">
          <section className="relative hidden lg:flex lg:h-screen lg:w-[60%] items-center justify-center overflow-hidden">
            <LottieBackground
              animationPath={animationPath}
              onLoad={handleReady}
              onError={handleReady}
            />
            <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-r from-transparent to-authBg" />
          </section>

          <section className="relative z-30 flex min-h-screen w-full lg:w-[48%] items-center justify-center bg-authBg px-4 py-10 sm:px-6 sm:py-14 overflow-y-auto">
            <div className="relative z-10 w-full max-w-[465px] mx-auto">
              <div className="flex items-center justify-center gap-10">{children}</div>
            </div>
          </section>
        </div>

        {ready && (
          <div className="pointer-events-none absolute left-[52%] top-1/2 z-[9999] hidden -translate-x-1/2 -translate-y-1/2 lg:block">
            <div className="rounded-[31px] bg-white shadow-xl">
              <div className="h-[132px] w-[132px] overflow-hidden rounded-[31px]">
                <Image
                  src="/auth/butterfly-illustration.png"
                  alt="Butterfly"
                  width={132}
                  height={132}
                  className="h-full w-full object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        )}
      </main>
    </>
  );
}
