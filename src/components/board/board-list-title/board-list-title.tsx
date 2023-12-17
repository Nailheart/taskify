"use client";

import { FC, useRef, useState } from "react";
import { toast } from "sonner";
import { FieldValues, FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEventListener } from "usehooks-ts";

import {
  TUpdateListTitleSchema,
  updateListTitleSchema,
} from "@/validation-schemas/update-list-title-schema";
import { updateListTitle } from "@/actions/update-list-title/update-list-title";
import { InputForm } from "@/components/input-form/input-form";
import { Button } from "@/components/ui/button";

type Props = {
  listId: string;
  boardId: string;
  listTitle: string;
};

const BoardListTitle: FC<Props> = ({ listId, boardId, listTitle }) => {
  const [title, setTitle] = useState(listTitle);
  const [isEditing, setIsEditing] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const form = useForm<TUpdateListTitleSchema>({
    resolver: zodResolver(updateListTitleSchema),
    defaultValues: {
      title: listTitle,
      boardId: "",
      listId: "",
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

    if (!newTitle || newTitle === listTitle) return;
    setTitle(newTitle);

    try {
      await updateListTitle({ title: newTitle, listId, boardId });
      toast.success("List title successfully updated.");
    } catch (error) {
      toast.error("Uh oh! Something went wrong.");
    }
  };

  if (isEditing) {
    return (
      <FormProvider {...form}>
        <form
          ref={formRef}
          className="w-full"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <InputForm
            className="h-9 w-full border-none"
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
      className="w-full justify-start px-3 py-2 text-sm font-medium hover:bg-white"
      variant="ghost"
      onClick={handleEdit}
    >
      {title}
    </Button>
  );
};

export { BoardListTitle };
