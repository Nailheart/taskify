import { FC, ReactNode } from "react";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type Props = {
  children: ReactNode;
  content: ReactNode;
  side?: "left" | "right" | "top" | "bottom";
  sideOffset?: number;
  className?: string;
};

const HintTooltip: FC<Props> = ({
  children,
  content,
  side,
  sideOffset,
  className,
}) => {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={0}>
        <TooltipTrigger className={className}>{children}</TooltipTrigger>
        <TooltipContent
          className="max-w-[220px] break-words px-4 py-2 text-xs"
          side={side}
          sideOffset={sideOffset}
        >
          {content}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export { HintTooltip };
