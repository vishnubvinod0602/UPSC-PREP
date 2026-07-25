import fs from "fs";
import axios from "axios";

const BASE_URL =
  "https://script.google.com/macros/s/AKfycbz_7_Ec9Bf0ew3yrjOgMSx0MRrrxJW1CiyjS6_m4Ab4_Zl5QZtMioHwwyRqKE22i5GW/exec";

const subjects = JSON.parse(
  fs.readFileSync("./lib/data/subjects.json", "utf8")
);

const BATCH_SIZE = 20;

async function run() {
  console.log(`Total subjects: ${subjects.length}`);

  for (let i = 0; i < subjects.length; i += BATCH_SIZE) {
    const batch = subjects.slice(i, i + BATCH_SIZE);

    console.log(
      `Uploading batch ${i / BATCH_SIZE + 1} (${batch.length} subjects)...`
    );

    await axios.post(BASE_URL, {
      action: "import",
      sheet: "Subjects",
      data: batch,
      clear: i === 0,
    });

    await new Promise((resolve) => setTimeout(resolve, 500));
  }

  console.log("✅ Subjects imported successfully.");
}

run().catch(console.error);