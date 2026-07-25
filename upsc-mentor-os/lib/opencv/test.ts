import { loadOpenCV } from "./loadOpenCV";

export async function testOpenCV() {
  const cv = await loadOpenCV();

  console.log("✅ OpenCV Loaded");
  console.log(cv);

  return cv;
}