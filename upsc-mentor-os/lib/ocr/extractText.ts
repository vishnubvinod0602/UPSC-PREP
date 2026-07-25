import { createWorker } from "tesseract.js";

let worker: Awaited<ReturnType<typeof createWorker>> | null = null;

async function getWorker() {
  if (!worker) {
    worker = await createWorker("eng");
  }

  return worker;
}

export async function extractText(image: Blob): Promise<string> {
  const worker = await getWorker();

  const {
    data: { text },
  } = await worker.recognize(image);

  return text.trim();
}