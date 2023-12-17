import { z } from "zod";

const createListSchema = z.object({
  title: z.string().min(1, "Title cannot be empty.").trim(),
  boardId: z.string(),
});

type TCreateListSchema = z.infer<typeof createListSchema>;

export { createListSchema, type TCreateListSchema };
