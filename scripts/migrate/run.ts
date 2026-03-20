import { importBrands } from "./import-brands";
import { importCameras } from "./import-cameras";
import { logStep } from "./utils";

async function main() {
  logStep("Importing brands");
  const brandMap = await importBrands();

  logStep("Importing cameras");
  await importCameras(brandMap);

  logStep("Done");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});