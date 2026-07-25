"use client";

import { useState } from "react";

const fallbackImage = "/images/courses/default.jpg";

function isPublicCourseImage(path: string | undefined) {
  return Boolean(path && /^\/images\/courses\/[a-z0-9-]+\.(?:jpe?g|png|webp)$/i.test(path));
}

export default function CourseCardImage({ src, alt }: { src?: string; alt: string }) {
  const [imageSrc, setImageSrc] = useState(() => isPublicCourseImage(src) ? src : fallbackImage);

  return (
    <div className="mb-5 aspect-[16/9] overflow-hidden rounded-xl bg-mist">
      <img
        src={imageSrc}
        alt={alt}
        width={640}
        height={360}
        className="h-full w-full object-cover"
        onError={() => setImageSrc(fallbackImage)}
      />
    </div>
  );
}
