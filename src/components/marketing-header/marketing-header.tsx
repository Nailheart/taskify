import Link from "next/link";

import { Logo } from "@/components/logo/logo";
import { Button } from "@/components/ui/button";

const MarketingHeader = () => {
  return (
    <header className="fixed left-0 top-0 w-full border-b bg-white shadow-sm">
      <div className="container flex items-center justify-between gap-2 py-2">
        <Logo />
        <Button size="sm" variant="outline" asChild>
          <Link href="/sign-in">Sign in</Link>
        </Button>
      </div>
    </header>
  );
};

export { MarketingHeader };
