import { DEFAULT_SUBJECTS } from "@/lib/constants/subjects";
import { DEFAULT_RESOURCES } from "@/lib/constants/resources";
import { importSheet } from "./client";

export async function importDatabase() {
  try {
    // Import Subjects
    const subjectResult = await importSheet(
      "Subjects",
      DEFAULT_SUBJECTS
    );

    console.log("Subjects:", subjectResult);

    // Import Resources
    const resourceResult = await importSheet(
      "Resources",
      DEFAULT_RESOURCES
    );

    console.log("Resources:", resourceResult);

    return {
      success: true,
    };
  } catch (error) {
    console.error(error);

    return {
      success: false,
      error,
    };
  }
}