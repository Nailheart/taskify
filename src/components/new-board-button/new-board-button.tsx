"use client";

import { FC } from "react";
import { HelpCircleIcon } from "lucide-react";

import { HintTooltip } from "@/components/hint-tooltip/hint-tooltip";
import { useNewBoardModal } from "@/hooks/use-new-board-modal";
import { MAX_FREE_BOARDS } from "@/constants/boards";

type Props = {
  organizationLimit: number;
};

const NewBoardButton: FC<Props> = ({ organizationLimit }) => {
  const { onOpen } = useNewBoardModal();

  return (
    <div className="group relative aspect-video">
      <button
        className="flex h-full w-full cursor-pointer flex-col items-center justify-center rounded-sm bg-muted p-4 leading-tight duration-300 group-hover:bg-slate-200"
        onClick={onOpen}
      >
        <span className="mb-1 font-semibold">Create new board</span>
        <span className="text-sm">
          {`${MAX_FREE_BOARDS - organizationLimit} remaining`}
        </span>
      </button>
      <HintTooltip
        className="absolute bottom-4 right-4"
        content="Free workspaces can have up to 5 open boards. For unlimited boards
            upgrade this workspace to PRO."
        sideOffset={10}
      >
        <HelpCircleIcon className="h-4 w-4" />
      </HintTooltip>
    </div>
  );
};

export { NewBoardButton };
