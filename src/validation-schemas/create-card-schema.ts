import { z } from "zod";

const createCardSchema = z.object({
  title: z.string().min(1, "Title cannot be empty.").trim(),
  boardId: z.string(),
  listId: z.string(),
});

type TCreateCardSchema = z.infer<typeof createCardSchema>;

export { createCardSchema, type TCreateCardSchema };
