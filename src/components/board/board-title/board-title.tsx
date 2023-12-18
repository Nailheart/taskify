"use client";

import { FC, useRef, useState } from "react";
import { toast } from "sonner";
import { useEventListener } from "usehooks-ts";
import { FieldValues, FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { updateBoardTitle } from "@/actions/update-board-title/update-board-title";
import {
  TUpdateBoardTitleSchema,
  updateBoardTitleSchema,
} from "@/validation-schemas/update-board-title-schema";
import { InputForm } from "@/components/input-form/input-form";
import { Button } from "@/components/ui/button";

type Props = {
  boardId: string;
  boardTitle: string;
};

const BoardTitle: FC<Props> = ({ boardId, boardTitle }) => {
  const [title, setTitle] = useState(boardTitle);
  const [isEditing, setIsEditing] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const form = useForm<TUpdateBoardTitleSchema>({
    resolver: zodResolver(updateBoardTitleSchema),
    defaultValues: {
      title: boardTitle,
      boardId: "",
    },
  });

  const handleEdit = () => {
    setIsEditing(true);
    setTimeout(() => {
      form.setFocus("title");
    });
  };

  const handleEditEnd = () => {
    setIsEditing(false);
  };

  useEventListener("keydown", (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      handleEditEnd();
    }
  });

  const onBlur = () => {
    formRef.current?.requestSubmit();
    handleEditEnd();
  };

  const onSubmit = async (data: FieldValues) => {
    const newTitle = data.title;

    if (!newTitle || newTitle === boardTitle) return;
    setTitle(newTitle);

    try {
      const { type, message } = await updateBoardTitle({
        title: newTitle,
        boardId,
      });

      if (type === "error") {
        toast.error(message);
        return;
      }

      toast.success(message);
    } catch (error) {
      toast.error("Uh oh! Something went wrong.");
    }
  };

  if (isEditing) {
    return (
      <FormProvider {...form}>
        <form ref={formRef} onSubmit={form.handleSubmit(onSubmit)}>
          <InputForm
            className="h-8 max-w-xs border-none bg-transparent px-3 py-2 text-lg font-bold"
            name="title"
            autoComplete="off"
            onBlur={onBlur}
          />
        </form>
      </FormProvider>
    );
  }

  return (
    <Button
      className="text-lg font-bold leading-none"
      variant="ghost"
      size="sm"
      onClick={handleEdit}
    >
      {title}
    </Button>
  );
};

export { BoardTitle };
