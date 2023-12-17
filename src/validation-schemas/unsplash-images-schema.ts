import { z } from "zod";

const unsplashImagesSchema = z.object({
  collectionIds: z.array(z.string()),
  count: z.number(),
});

export { unsplashImagesSchema };
