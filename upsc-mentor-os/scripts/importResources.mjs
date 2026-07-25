import fs from "fs";
import axios from "axios";

const BASE_URL =
  "https://script.google.com/macros/s/AKfycbz_7_Ec9Bf0ew3yrjOgMSx0MRrrxJW1CiyjS6_m4Ab4_Zl5QZtMioHwwyRqKE22i5GW/exec";

// Adjust this path if your resources.json is elsewhere
const resources = JSON.parse(
  fs.readFileSync("./lib/data/resources.json", "utf8")
);

const BATCH_SIZE = 200;

async function run() {
  console.log(`Total resources: ${resources.length}`);

  for (let i = 0; i < resources.length; i += BATCH_SIZE) {
    const batch = resources.slice(i, i + BATCH_SIZE);

    console.log(
      `Uploading batch ${i / BATCH_SIZE + 1} (${batch.length} records)...`
    );

    await axios.post(BASE_URL, {
      action: "import",
      sheet: "Resources",
      data: batch,
      clear: i === 0,
    });

    // Small delay to avoid Apps Script throttling
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }

  console.log("✅ Import complete.");
}

run().catch(console.error);