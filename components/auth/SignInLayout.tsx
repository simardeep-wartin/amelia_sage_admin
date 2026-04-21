import Image from "next/image";
import { ReactNode } from "react";
import VideoBackground from "@/components/auth/VideoBackground";

type SignInLayoutProps = {
  children: ReactNode;
  animationPath: string;
};

export default function SignInLayout({ children, animationPath }: SignInLayoutProps) {
  return (
    <main className="relative min-h-screen w-full bg-stone">
      <div className="flex min-h-screen flex-col lg:flex-row">
        <section className="relative hidden lg:flex lg:min-h-screen lg:w-1/2 items-center justify-center overflow-hidden">
          <VideoBackground animationPath={animationPath} />
        </section>

        <section className="relative z-30 flex min-h-screen w-full lg:w-1/2 items-center justify-center bg-authBg px-4 py-10 sm:px-6 sm:py-14 overflow-y-auto">
          <div className="relative z-10 w-full max-w-[465px] mx-auto">
            <div className="flex items-center justify-center gap-10">{children}</div>
          </div>
        </section>
      </div>

      <div className="pointer-events-none absolute left-1/2 top-1/2 z-[9999] hidden -translate-x-1/2 -translate-y-1/2 lg:block">
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

      <div className="pointer-events-none absolute inset-y-0 left-[58%] hidden w-[169px] -translate-x-full bg-gradient-to-r from-transparent to-softstone lg:block" />
    </main>
  );
}
