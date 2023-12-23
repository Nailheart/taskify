import Link from "next/link";

import { cn } from "@/lib/utils";
import { popins, calSans } from "@/fonts/fonts";
import { Button } from "@/components/ui/button";

const MarketingPage = () => {
  return (
    <section className="flex h-full items-center justify-center text-center">
      <div className="container">
        <h1
          className={cn(
            "flex flex-col items-center text-center text-3xl md:text-6xl",
            calSans.className,
          )}
        >
          Taskify help teams
          <span className="mt-3 inline-block animate-bounce rounded-md bg-gradient-to-bl from-rose-400 to-orange-400 p-2 px-4 text-3xl text-white md:mt-6 md:text-6xl">
            move forward.
          </span>
        </h1>
        <div
          className={cn(
            "mx-auto mt-4 max-w-xs text-center text-sm text-neutral-500 md:max-w-2xl md:text-xl",
            popins.className,
          )}
        >
          Collaborate, manage projects, and reach new productivity peaks. From
          corporate high-rise to the home offices, Taskify empowers you to
          achieve it all with unparalleled efficiency.
        </div>
        <Button className="mt-6" size="lg" asChild>
          <Link href="/sign-in">Try Taskify for free</Link>
        </Button>
      </div>
    </section>
  );
};

export default MarketingPage;
