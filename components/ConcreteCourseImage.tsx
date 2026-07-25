"use client";

import { useState } from "react";

const fallbackImage = "/images/courses/default.jpg";

export default function ConcreteCourseImage({ src, alt }: { src: string; alt: string }) {
  const [imageSrc, setImageSrc] = useState(src || fallbackImage);
  return <img src={imageSrc} alt={alt} width={640} height={192} onError={() => setImageSrc(fallbackImage)} className="h-48 w-full object-cover"/>;
}
