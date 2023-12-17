import { NextResponse } from "next/server";

import { unsplash } from "@/lib/unsplash";
import { UnsplashImage } from "@/types/types";
import { unsplashImagesSchema } from "@/validation-schemas/unsplash-images-schema";

const POST = async (req: Request) => {
  const body: unknown = await req.json();

  const parse = unsplashImagesSchema.safeParse(body);
  if (!parse.success) return;

  const { collectionIds, count } = parse.data;

  try {
    const result = await unsplash.photos.getRandom({
      collectionIds: collectionIds,
      count,
    });

    if (result.status !== 200) {
      return NextResponse.json("Failed to load images from Unsplash", {
        status: 500,
      });
    }

    const images = result.response as UnsplashImage[];

    return NextResponse.json(images, { status: 200 });
  } catch (error) {
    return NextResponse.json("Internal Server Error", {
      status: 500,
    });
  }
};

export { POST };
