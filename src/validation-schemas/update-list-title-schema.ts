import { z } from "zod";

const updateListTitleSchema = z.object({
  title: z.string().min(1, "Title cannot be empty.").trim(),
  boardId: z.string(),
  listId: z.string(),
});

type TUpdateListTitleSchema = z.infer<typeof updateListTitleSchema>;

export { updateListTitleSchema, type TUpdateListTitleSchema };
