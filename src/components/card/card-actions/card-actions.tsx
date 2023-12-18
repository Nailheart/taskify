"use client";

import { FC } from "react";
import { toast } from "sonner";
import { CopyIcon, Trash2Icon } from "lucide-react";

import { CardWithList } from "@/types/types";
import { useCardModal } from "@/hooks/use-card-modal";
import { copyCard } from "@/actions/copy-card/copy-card";
import { deleteCard } from "@/actions/delete-card/delete-card";
import { Button } from "@/components/ui/button";

type Props = {
  card: CardWithList;
};

const CardActions: FC<Props> = ({ card }) => {
  const { onClose } = useCardModal();

  const handleCopyCard = async () => {
    try {
      const { type, message } = await copyCard({
        cardId: card.id,
        boardId: card.list.boardId,
      });

      if (type === "error") {
        toast.error(message);
        return;
      }

      onClose();
      toast.success(message);
    } catch (error) {
      toast.error("Uh oh! Something went wrong.");
    }
  };

  const handleDeleteCard = async () => {
    try {
      const { type, message } = await deleteCard({
        cardId: card.id,
        boardId: card.list.boardId,
      });

      if (type === "error") {
        toast.error(message);
        return;
      }

      onClose();
      toast.success(message);
    } catch (error) {
      toast.error("Uh oh! Something went wrong.");
    }
  };

  return (
    <div className="min-w-[150px]">
      <h2 className="mb-2 text-xs">Actions</h2>
      <ul className="grid grid-cols-2 gap-2 md:grid-cols-1">
        <li>
          <Button
            className="w-full justify-start"
            size="sm"
            variant="slate"
            onClick={handleCopyCard}
          >
            <CopyIcon className="mr-2 flex-shrink-0" size={16} />
            Copy
          </Button>
        </li>
        <li>
          <Button
            className="w-full justify-start"
            size="sm"
            variant="slate"
            onClick={handleDeleteCard}
          >
            <Trash2Icon className="mr-2 flex-shrink-0" size={16} />
            Delete
          </Button>
        </li>
      </ul>
    </div>
  );
};

export { CardActions };
