import { FC } from "react";
import { Draggable } from "@hello-pangea/dnd";

import { cn } from "@/lib/utils";
import { useCardModal } from "@/hooks/use-card-modal";
import { TextIcon } from "lucide-react";

type Props = {
  cardId: string;
  title: string;
  index: number;
  className?: string;
  hasDescription?: boolean;
};

const BoardCard: FC<Props> = ({
  cardId,
  title,
  index,
  className,
  hasDescription,
}) => {
  const { onOpen } = useCardModal();

  const handleCardModal = () => onOpen(cardId);

  return (
    <Draggable draggableId={cardId} index={index}>
      {(provided) => (
        <div
          className={cn(
            "!cursor-pointer rounded-md bg-white px-3 py-2",
            className,
          )}
          ref={provided.innerRef}
          role="button"
          onClick={handleCardModal}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          {title}
          {hasDescription && (
            <div className="mt-1 flex flex-wrap gap-2">
              <span title="This card has description">
                <TextIcon />
              </span>
            </div>
          )}
        </div>
      )}
    </Draggable>
  );
};

export { BoardCard };
