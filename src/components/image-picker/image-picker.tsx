"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { CheckIcon } from "lucide-react";
import { toast } from "sonner";

import { defaultImages } from "@/constants/images";
import { Spinner } from "@/components/spinner/spinner";
import { ConnectForm } from "@/components/connect-form/connect-form";

const ImagePicker = () => {
  const [images, setImages] = useState(defaultImages);
  const [isLoading, setIsLoading] = useState(false);

  const getImages = async () => {
    setIsLoading(true);

    const res = await fetch("/api/unsplash/get-random-images", {
      method: "POST",
      body: JSON.stringify({ collectionIds: ["317099"], count: 9 }),
    });

    if (!res.ok) {
      const errorMessage = await res.json();
      toast.error(errorMessage);
      return;
    }

    const newImages = await res.json();
    setImages(newImages);
    setIsLoading(false);
  };

  useEffect(() => {
    getImages();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-6">
        <Spinner className="text-[--blue]" />
      </div>
    );
  }

  return (
    <div className="grid-cols grid grid-cols-3 gap-2">
      {images.map((image) => (
        <label
          key={image.id}
          className="group relative aspect-video bg-muted transition duration-300 hover:opacity-75"
        >
          <Image
            className="h-full w-full rounded-sm object-cover"
            width={150}
            height={85}
            src={image.urls.thumb}
            alt="Unsplash image"
          />
          <ConnectForm>
            {({ register }) => (
              <input
                className="peer absolute left-0 top-0 h-full w-full cursor-pointer appearance-none rounded-sm"
                type="radio"
                value={JSON.stringify({
                  imageId: image.id,
                  imageThumbUrl: image.urls.thumb,
                  imageFullUrl: image.urls.full,
                  imageUserName: image.links.html,
                  imageLinkHTML: image.user.name,
                })}
                {...register("image")}
              />
            )}
          </ConnectForm>
          <div className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center bg-black/30 opacity-0 duration-300 peer-checked:opacity-100">
            <CheckIcon className="h-4 w-4 text-white" />
          </div>
          <Link
            className="link absolute bottom-0 w-full truncate bg-black/70 p-1 text-xs text-white opacity-0 duration-300 group-hover:opacity-100 peer-focus-visible:opacity-100 hover:underline"
            href={image.links.html}
            target="_blank"
            rel="noopener noreferrer"
            tabIndex={-1}
          >
            {image.user.name}
          </Link>
        </label>
      ))}
    </div>
  );
};

export { ImagePicker };
