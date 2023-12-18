"use client";

import { FC, useRef, useState } from "react";
import { toast } from "sonner";
import { TextIcon } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";

import { CardWithList } from "@/types/types";
import { useEventListener, useOnClickOutside } from "usehooks-ts";
import { updateCard } from "@/actions/update-card/update-card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

type Props = {
  card: CardWithList;
};

const CardDescription: FC<Props> = ({ card }) => {
  const queryClient = useQueryClient();
  const formRef = useRef<HTMLFormElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = () => {
    setIsEditing(true);
    setTimeout(() => {
      textareaRef.current?.focus();
    });
  };
  const handleEditEnd = () => setIsEditing(false);

  useEventListener("keydown", (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      handleEditEnd();
    }
  });
  useOnClickOutside(formRef, handleEditEnd);

  const onSubmit = async (data: FormData) => {
    const description = data.get("description") as string;

    if (description === card.description) return;

    try {
      const { type, message } = await updateCard({
        cardId: card.id,
        boardId: card.list.boardId,
        description,
      });

      if (type === "error") {
        toast.error(message);
        return;
      }

      // refetch card data
      queryClient.invalidateQueries({
        queryKey: ["card", card.id],
      });
      queryClient.invalidateQueries({
        queryKey: ["card-audit-logs", card.id],
      });

      handleEditEnd();
      toast.success(message);
    } catch (error) {
      toast.error("Uh oh! Something went wrong.");
    }
  };

  return (
    <div>
      <div className="mb-3 flex items-center gap-x-4">
        <TextIcon className="flex-shrink-0" />
        <h2 className="text-lg font-semibold">Description</h2>
      </div>
      {isEditing && (
        <form ref={formRef} action={onSubmit}>
          <Textarea
            className="px-[11px] py-[7px]"
            ref={textareaRef}
            name="description"
            defaultValue={card.description || undefined}
            placeholder="Add a more detailed description..."
          />
          <div className="mt-2 flex items-center gap-x-2">
            <Button size="sm" type="submit" variant="blue">
              Save
            </Button>
            <Button
              size="sm"
              type="button"
              variant="ghost"
              onClick={handleEditEnd}
            >
              Cancel
            </Button>
          </div>
        </form>
      )}
      {!isEditing && (
        <Button
          className="min-h-[80px] w-full items-start justify-start rounded-sm"
          type="button"
          variant="slate"
          onClick={handleEdit}
        >
          {card.description || "Add a more detailed description..."}
        </Button>
      )}
    </div>
  );
};

export { CardDescription };
