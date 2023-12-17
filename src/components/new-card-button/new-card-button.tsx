"use client";

import { FC, useRef, useState } from "react";
import { toast } from "sonner";
import { PlusIcon, XIcon } from "lucide-react";
import { useEventListener, useOnClickOutside } from "usehooks-ts";
import { FieldValues, FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { createCard } from "@/actions/create-card/create-card";
import {
  TCreateCardSchema,
  createCardSchema,
} from "@/validation-schemas/create-card-schema";
import { InputForm } from "@/components/input-form/input-form";
import { Button } from "@/components/ui/button";

type Props = {
  listId: string;
  boardId: string;
};

const NewCardButton: FC<Props> = ({ boardId, listId }: Props) => {
  const formRef = useRef<HTMLFormElement>(null);
  const [isEditing, setIsEditing] = useState(false);

  const form = useForm<TCreateCardSchema>({
    resolver: zodResolver(createCardSchema),
    defaultValues: {
      title: "",
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
    form.reset();
    setIsEditing(false);
  };

  useEventListener("keydown", (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      handleEditEnd();
    }
  });
  useOnClickOutside(formRef, handleEditEnd);

  const onSubmit = async (data: FieldValues) => {
    const title = data.title;
    if (!title) return;

    try {
      await createCard({ cardTitle: title, boardId, listId });
      form.setFocus("title");
      form.reset();
      toast.success("Card successfully created.");
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
            className="font-medium"
            name="title"
            placeholder="Enter card title..."
            autoComplete="off"
          />
          <div className="mt-4 flex items-center justify-end gap-x-2">
            <Button
              type="submit"
              size="sm"
              disabled={form.formState.isSubmitting}
            >
              Add card
            </Button>
            <Button
              size="sm"
              type="button"
              variant="ghost"
              onClick={handleEditEnd}
            >
              <XIcon className="h-5 w-5" />
            </Button>
          </div>
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
      <PlusIcon className="mr-2 h-4 w-4" />
      Add a card
    </Button>
  );
};

export { NewCardButton };
