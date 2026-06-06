import fs from "fs-extra";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const srcDir = path.resolve(__dirname, "../src/svg");
const coreTypesFile = path.resolve(__dirname, "../src/types.ts");

async function generateTypes(): Promise<void> {
  console.log("[@latice/flags] Generating types...");

  const dir = path.join(srcDir, "md");
  if (!(await fs.pathExists(dir))) {
    console.error("[@latice/flags] svg/md directory not found");
    process.exit(1);
  }

  const files = await fs.readdir(dir);
  const codes = files
    .filter((f) => f.endsWith(".svg"))
    .map((f) => f.replace(".svg", "").toUpperCase())
    .sort();

  const flagCodeUnion = codes.map((c) => `  | "${c}"`).join("\n");

  await fs.writeFile(
    coreTypesFile,
    `// This file is partially auto-generated — FlagCode is rebuilt on every \`pnpm gen\`
// BaseFlagProps is maintained manually

export interface BaseFlagProps {
  size?: "sm" | "md" | "lg";
  gradient?: "top-down" | "linear";
  shadow?: boolean;
  border?: boolean;
  rounded?: boolean;
}

export type FlagCode =
${flagCodeUnion};
`,
  );

  console.log(
    `[@latice/flags] Done: ${codes.length} codes written to types.ts`,
  );
}

generateTypes().catch((err) => {
  console.error("[@latice/flags] " + err);
  process.exit(1);
});
