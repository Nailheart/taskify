"use client";

import { FC } from "react";
import { toast } from "sonner";
import { MoreHorizontalIcon, Trash2Icon, XIcon } from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { deleteBoard } from "@/actions/delete-board/delete-board";

type Props = {
  boardId: string;
};

const BoardSettings: FC<Props> = ({ boardId }: Props) => {
  const router = useRouter();

  const handleDeleteBoard = async () => {
    try {
      await deleteBoard({ id: boardId });
      toast.success("Board successfully deleted.");
      router.replace("/");
    } catch (error) {
      toast.error("Uh oh! Something went wrong.");
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className="h-auto w-auto p-2" variant="ghost">
          <MoreHorizontalIcon className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="px-4 pb-4 pt-3" side="bottom" align="end">
        <div className="mb-3 text-center text-sm font-medium">
          Board settings
        </div>
        <PopoverClose asChild>
          <Button
            className="absolute right-2 top-2 h-auto w-auto p-2 text-muted-foreground"
            variant="ghost"
          >
            <XIcon className="h-4 w-4" />
          </Button>
        </PopoverClose>
        <Button
          className="group h-auto w-full justify-start gap-2 px-4 py-2 text-sm font-normal"
          variant="ghost"
          onClick={handleDeleteBoard}
        >
          <Trash2Icon className="h-4 w-4 duration-200 group-hover:text-red-500" />
          <span>Delete board</span>
        </Button>
      </PopoverContent>
    </Popover>
  );
};

export { BoardSettings };
