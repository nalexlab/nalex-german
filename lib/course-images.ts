import "server-only";

import { readdir } from "node:fs/promises";
import path from "node:path";

const courseImageDirectory = path.join(process.cwd(), "public", "images", "courses");
const supportedImageExtension = /\.(?:jpe?g|png|webp)$/i;

/** Lists local public course images as root-relative paths for the admin form. */
export async function getCourseImagePaths(): Promise<string[]> {
  try {
    const entries = await readdir(courseImageDirectory, { withFileTypes: true });
    return entries
      .filter((entry) => entry.isFile() && supportedImageExtension.test(entry.name))
      .map((entry) => `/images/courses/${entry.name}`)
      .sort((a, b) => a.localeCompare(b));
  } catch {
    return ["/images/courses/default.jpg"];
  }
}
