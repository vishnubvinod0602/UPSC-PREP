import { loadOpenCV } from "./loadOpenCV";

export async function imageToMat(
  image: HTMLImageElement
) {
  const cv = await loadOpenCV();

  return cv.imread(image);
}