"use client";

import { FC, useRef } from "react";
import { toast } from "sonner";
import { CopyIcon, MoreHorizontalIcon, Trash2Icon, XIcon } from "lucide-react";

import { deleteList } from "@/actions/delete-list/delete-list";
import { copyList } from "@/actions/copy-list/copy-list";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

type Props = {
  listId: string;
  boardId: string;
};

const BoardListSettings: FC<Props> = ({ boardId, listId }: Props) => {
  const refClose = useRef<HTMLButtonElement>(null);

  const handleCopyList = async () => {
    try {
      const { type, message } = await copyList({ listId, boardId });

      if (type === "error") {
        toast.error(message);
        return;
      }

      refClose.current?.click();
      toast.success(message);
    } catch (error) {
      toast.error("Uh oh! Something went wrong.");
    }
  };

  const handleDeleteList = async () => {
    try {
      const { type, message } = await deleteList({ listId, boardId });

      if (type === "error") {
        toast.error(message);
        return;
      }

      refClose.current?.click();
      toast.success(message);
    } catch (error) {
      toast.error("Uh oh! Something went wrong.");
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          className="h-9 w-9 flex-shrink-0 p-2 hover:bg-white"
          variant="ghost"
        >
          <MoreHorizontalIcon className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="px-4 pb-4 pt-3" side="bottom" align="end">
        <div className="mb-3 text-center text-sm font-medium">
          List settings
        </div>
        <PopoverClose asChild>
          <Button
            className="absolute right-2 top-2 h-auto w-auto p-2 text-muted-foreground"
            ref={refClose}
            variant="ghost"
          >
            <XIcon className="h-4 w-4" />
          </Button>
        </PopoverClose>
        <Button
          className="group h-auto w-full justify-start gap-2 px-4 py-2 text-sm font-normal"
          variant="ghost"
          onClick={handleCopyList}
        >
          <CopyIcon className="h-4 w-4 duration-200 group-hover:text-red-500" />
          <span>Copy list</span>
        </Button>
        <Button
          className="group h-auto w-full justify-start gap-2 px-4 py-2 text-sm font-normal"
          variant="ghost"
          onClick={handleDeleteList}
        >
          <Trash2Icon className="h-4 w-4 duration-200 group-hover:text-red-500" />
          <span>Delete list</span>
        </Button>
      </PopoverContent>
    </Popover>
  );
};

export { BoardListSettings };
