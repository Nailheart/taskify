import { FC } from "react";
import { Draggable } from "@hello-pangea/dnd";

import { cn } from "@/lib/utils";
import { useCardModal } from "@/hooks/use-card-modal";

type Props = {
  cardId: string;
  title: string;
  index: number;
  className?: string;
};

const BoardCard: FC<Props> = ({ cardId, title, index, className }) => {
  const { onOpen } = useCardModal();

  const handleCardModal = () => onOpen(cardId);

  return (
    <Draggable draggableId={cardId} index={index}>
      {(provided) => (
        // TODO:
        // if have description add text icon
        <div
          className={cn("rounded-md bg-white px-3 py-2", className)}
          ref={provided.innerRef}
          role="button"
          onClick={handleCardModal}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          {title}
        </div>
      )}
    </Draggable>
  );
};

export { BoardCard };
