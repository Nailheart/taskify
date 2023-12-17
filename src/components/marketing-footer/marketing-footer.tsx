import Link from "next/link";

import { Button } from "@/components/ui/button";

const MarketingFooter = () => {
  return (
    <footer className="border-t">
      <div className="container flex flex-wrap items-center justify-center gap-2 py-2">
        <Button size="sm" variant="link" asChild>
          <Link href="#">Privacy Policy</Link>
        </Button>
        <Button size="sm" variant="link" asChild>
          <Link href="#">Terms of Service</Link>
        </Button>
      </div>
    </footer>
  );
};

export { MarketingFooter };
