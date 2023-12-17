"use client";

import { toast } from "sonner";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useNewBoardModal } from "@/hooks/use-new-board-modal";
import { useSubsriptionModal } from "@/hooks/use-subscription-modal";
import { createBoard } from "@/actions/create-board/create-board";
import { isOrganizationLimitReached } from "@/actions/is-organization-limit-reached/is-organization-limit-reached";
import {
  TCreateBoardSchema,
  createBoardSchema,
} from "@/validation-schemas/create-board-schema";
import { ImagePicker } from "@/components/image-picker/image-picker";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { InputForm } from "@/components/input-form/input-form";
import { Button } from "@/components/ui/button";

const NewBoardModal = () => {
  const { isOpen, onClose } = useNewBoardModal();
  const { onOpen: onOpenSubModal } = useSubsriptionModal();

  const form = useForm<TCreateBoardSchema>({
    resolver: zodResolver(createBoardSchema),
    defaultValues: {
      title: "",
      image: "",
    },
  });

  const handleCloseModal = () => {
    onClose();
    form.clearErrors();
  };

  const onSubmit = async (data: TCreateBoardSchema) => {
    const title = data.title;
    const image = JSON.parse(data.image);

    const isLimitReached = await isOrganizationLimitReached();

    if (isLimitReached) {
      onOpenSubModal();
      toast.error(
        "You have reached your limit of free boards. Please upgrade to create more.",
      );
      return;
    }

    try {
      const board = await createBoard({ title, image });

      if (board) {
        if ("error" in board) {
          toast.error(`${board.error}`);
          return;
        }
      }

      onClose();
      toast.success("Board successfully created.");
      form.reset();
    } catch (error) {
      toast.error("Uh oh! Something went wrong.");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleCloseModal}>
      <DialogContent className="rounded-md">
        <DialogHeader>
          <DialogTitle className="mb-4 text-center ">
            Create a new board
          </DialogTitle>
        </DialogHeader>
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="mb-4 space-y-0.5">
              <ImagePicker />
              {form.formState.errors.image && (
                <p className="text-sm font-medium text-destructive">
                  {form.formState.errors.image.message}
                </p>
              )}
            </div>
            <h2 className="mb-2 mt-4 text-xl font-semibold">Title</h2>
            <InputForm
              name="title"
              placeholder="Enter board title..."
              autoComplete="off"
            />
            <Button
              className="mt-4"
              type="submit"
              disabled={form.formState.isSubmitting}
            >
              Submit
            </Button>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
};

export { NewBoardModal };
