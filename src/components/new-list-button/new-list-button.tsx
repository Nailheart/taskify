"use client";

import { FC, RefObject, useRef, useState } from "react";
import { toast } from "sonner";
import { PlusIcon, XIcon } from "lucide-react";
import { useEventListener, useOnClickOutside } from "usehooks-ts";
import { FieldValues, FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { createList } from "@/actions/create-list/create-list";
import {
  TCreateListSchema,
  createListSchema,
} from "@/validation-schemas/create-list-schema";
import { InputForm } from "@/components/input-form/input-form";
import { Button } from "@/components/ui/button";

type Props = {
  boardId: string;
  canvasRef: RefObject<HTMLDivElement>;
};

const NewListButton: FC<Props> = ({ boardId, canvasRef }: Props) => {
  const formRef = useRef<HTMLFormElement>(null);
  const [isEditing, setIsEditing] = useState(false);

  const form = useForm<TCreateListSchema>({
    resolver: zodResolver(createListSchema),
    defaultValues: {
      title: "",
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
    form.reset();
    setIsEditing(false);
  };

  useEventListener("keydown", (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      handleEditEnd();
    }
  });
  useOnClickOutside(formRef, handleEditEnd);

  // TODO: mb use zustand to handle lists and remove revalidate
  const handleSrollToRight = () => {
    setTimeout(() => {
      if (canvasRef.current) {
        canvasRef.current.scrollLeft += canvasRef.current.scrollWidth;
      }
    }, 500);
  };

  const onSubmit = async (data: FieldValues) => {
    const title = data.title;

    if (!title) return;

    try {
      await createList({ title, boardId });

      form.setFocus("title");
      form.reset();
      handleSrollToRight();

      toast.success("List successfully created.");
    } catch (error) {
      toast.error("Uh oh! Something went wrong.");
    }
  };

  if (isEditing) {
    return (
      <FormProvider {...form}>
        <form
          ref={formRef}
          className="w-full space-y-4 rounded-md bg-white p-4 shadow-md"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <InputForm
            className="h-9 px-3 py-1 text-sm font-medium"
            name="title"
            placeholder="Enter list title..."
            autoComplete="off"
          />
          <div className="flex items-center justify-end gap-x-2">
            <Button type="submit" size="sm">
              Add list
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
    <button
      className="flex w-full items-center rounded-md bg-white px-3 py-2 text-sm font-medium  transition hover:bg-white/50"
      onClick={handleEdit}
    >
      <PlusIcon className="mr-2 h-4 w-4" />
      Add a list
    </button>
  );
};

export { NewListButton };
