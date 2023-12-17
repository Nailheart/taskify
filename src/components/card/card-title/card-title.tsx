"use client";

import { FC, useRef } from "react";
import { toast } from "sonner";
import { FieldValues, FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { CardWithList } from "@/types/types";
import { updateCard } from "@/actions/update-card/update-card";
import { useQueryClient } from "@tanstack/react-query";
import {
  TUpdateCardSchema,
  updateCardSchema,
} from "@/validation-schemas/update-card-schema";
import { InputForm } from "@/components/input-form/input-form";
import { useOnClickOutside } from "usehooks-ts";

type Props = {
  card: CardWithList;
};

const CardTitle: FC<Props> = ({ card }) => {
  const queryClient = useQueryClient();
  const formRef = useRef<HTMLFormElement>(null);

  const form = useForm<TUpdateCardSchema>({
    resolver: zodResolver(updateCardSchema),
    defaultValues: {
      cardId: "",
      boardId: "",
      title: card.title,
    },
  });

  const onBlur = () => {
    formRef.current?.requestSubmit();
  };

  const onSubmit = async (data: FieldValues) => {
    const title = data.title;
    if (!title || title === card.title) return;

    try {
      await updateCard({
        cardId: card.id,
        boardId: card.list.boardId,
        title,
      });
      // refetch card data
      queryClient.invalidateQueries({
        queryKey: ["card", card.id],
      });
      queryClient.invalidateQueries({
        queryKey: ["card-audit-logs", card.id],
      });
      toast.success("Card title successfully updated.");
    } catch (error) {
      toast.error("Uh oh! Something went wrong.");
    }
  };

  return (
    <FormProvider {...form}>
      <form
        ref={formRef}
        className="w-full"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <InputForm
          className="border-none px-[10px] py-[6px] text-xl font-semibold"
          name="title"
          autoFocus={false}
          placeholder="Enter card title..."
          autoComplete="off"
          onBlur={onBlur}
        />
      </form>
    </FormProvider>
  );
};

export { CardTitle };
