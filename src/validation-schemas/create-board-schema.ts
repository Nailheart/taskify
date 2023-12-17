import { z } from "zod";

const createBoardSchema = z.object({
  title: z.string().min(1, "Title cannot be empty.").trim(),
  image: z
    .string({
      required_error: "Image is required",
      invalid_type_error: "Image is required",
    })
    .min(1, "Image is required"),
});

type TCreateBoardSchema = z.infer<typeof createBoardSchema>;

export { createBoardSchema, type TCreateBoardSchema };
