import { z } from "zod";

const updateBoardTitleSchema = z.object({
  title: z.string().min(1, "Title cannot be empty.").trim(),
  boardId: z.string(),
});

type TUpdateBoardTitleSchema = z.infer<typeof updateBoardTitleSchema>;

export { updateBoardTitleSchema, type TUpdateBoardTitleSchema };
