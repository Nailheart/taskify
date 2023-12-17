import { z } from "zod";

const updateCardSchema = z.object({
  cardId: z.string(),
  boardId: z.string(),
  title: z.optional(
    z
      .string()
      .min(1, {
        message: "Title cannot be empty.",
      })
      .trim(),
  ),
  description: z.optional(
    z.string().min(1, {
      message: "Description cannot be empty.",
    }),
  ),
});

type TUpdateCardSchema = z.infer<typeof updateCardSchema>;

export { updateCardSchema, type TUpdateCardSchema };
