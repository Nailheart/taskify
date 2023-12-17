import Link from "next/link";
import { ClipboardCheckIcon } from "lucide-react";

import { cn } from "@/lib/utils";

type Props = {
  className?: string;
};

const Logo: React.FC<Props> = ({ className }) => {
  return (
    <Link className={cn("flex items-center gap-x-2", className)} href="/">
      <ClipboardCheckIcon size={30} />
      <span className="text-lg font-bold text-neutral-700">Taskify</span>
    </Link>
  );
};

export { Logo };
