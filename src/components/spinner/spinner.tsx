import { FC } from "react";
import { Loader2Icon, LucideProps } from "lucide-react";

import { cn } from "@/lib/utils";

const Spinner: FC<LucideProps> = ({ className }) => {
  return <Loader2Icon className={cn("animate-spin", className)} />;
};

export { Spinner };
