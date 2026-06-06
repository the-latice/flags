import fs from "fs-extra";
import path from "path";
import { optimize } from "svgo";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

type Target = "vue" | "react";

const target = process.argv[2] as Target;
if (!target || !["vue", "react"].includes(target)) {
  console.error("[@latice/flags] Usage: tsx generate-flags.ts vue|react");
  process.exit(1);
}

const srcDir = path.resolve(__dirname, "../src/svg");
const targetDir = path.resolve(__dirname, `../../${target}`);

const outDir = path.resolve(targetDir, "src/flags");
const lazyFile = path.resolve(targetDir, "src/runtime/lazy-registry.ts");
const indexFile = path.resolve(targetDir, "src/index.ts");
const staticEntryFile = path.resolve(targetDir, "src/static-entry.ts");

const sizes = ["sm", "md", "lg"] as const;
type Size = (typeof sizes)[number];

type FlagData = Record<string, Record<Size, string>>;

function toSafeName(code: string): string {
  return code.replace(/-/g, "_");
}

async function build(): Promise<void> {
  console.log(`[@latice/flags] Generating ${target} flags...`);
  await fs.emptyDir(outDir);

  const codes = new Set<string>();
  const flagData: Record<string, Partial<Record<Size, string>>> = {};

  for (const size of sizes) {
    const dir = path.join(srcDir, size);
    if (!(await fs.pathExists(dir))) continue;
    const files = await fs.readdir(dir);

    for (const file of files.filter((f) => f.endsWith(".svg"))) {
      const code = file.replace(".svg", "").toUpperCase();
      codes.add(code);

      const raw = await fs.readFile(path.join(dir, file), "utf-8");
      const result = optimize(raw, {
        plugins: [
          "preset-default",
          {
            name: "prefixIds",
            params: { prefix: `fp_${toSafeName(code)}_${size}`, delim: "" },
          },
          { name: "removeDimensions" },
          { name: "removeXMLNS" },
        ],
      });

      if (!flagData[code]) flagData[code] = {};
      flagData[code][size] = result.data;
    }
  }

  const sortedCodes = Array.from(codes).sort();

  for (const code of sortedCodes) {
    const missing = sizes.filter((s) => !flagData[code][s]);
    if (missing.length > 0) {
      console.error(
        `[@latice/flags] Missing sizes for ${code}: ${missing.join(", ")}`,
      );
      process.exit(1);
    }
  }

  const validatedFlagData = flagData as FlagData;

  const staticExports: string[] = [];
  const lazyStatements: string[] = [];

  const corePackage = "@latice/flags-core";

  for (const code of sortedCodes) {
    const data = validatedFlagData[code];
    const safeName = toSafeName(code);

    let content: string;

    if (target === "vue") {
      content = `import { defineComponent, h, type PropType } from 'vue'
import FlagFrame from '../components/FlagFrame.vue'
import type { BaseFlagProps } from '${corePackage}'

const svg = {
  sm: \`${data.sm}\`,
  md: \`${data.md}\`,
  lg: \`${data.lg}\`
} as const

export default defineComponent({
  name: 'Flag${safeName}',
  props: {
    size: { type: String as PropType<BaseFlagProps['size']>, default: 'md' },
    gradient: { type: String as PropType<BaseFlagProps['gradient']>, default: undefined },
    shadow: { type: Boolean, default: false },
    border: { type: Boolean, default: true },
    rounded: { type: Boolean, default: true }
  },
  setup(props) {
    return () =>
      h(FlagFrame, props as any, {
        default: () => h('div', {
          style: 'width:100%;height:100%;display:flex;line-height:0;',
          innerHTML: svg[props.size as keyof typeof svg]
        })
      })
  }
})
`;
    } else if (target === "react") {
      content = `import { FlagFrame } from '../components/FlagFrame'
import type { BaseFlagProps } from '${corePackage}'

const svg = {
  sm: \`${data.sm}\`,
  md: \`${data.md}\`,
  lg: \`${data.lg}\`
} as const

function Flag${safeName}({
  size = 'md',
  gradient,
  shadow = false,
  border = true,
  rounded = true
}: BaseFlagProps) {
  return (
    <FlagFrame size={size} gradient={gradient} shadow={shadow} border={border} rounded={rounded}>
      <div
        style={{ width: '100%', height: '100%', display: 'flex', lineHeight: 0 }}
        dangerouslySetInnerHTML={{ __html: svg[size] }}
      />
    </FlagFrame>
  )
}

Flag${safeName}.displayName = 'Flag${safeName}'

export default Flag${safeName}
`;
    } else {
      throw new Error(`[@latice/flags] Unknown target: ${target}`);
    }

    const ext = target === "react" ? "tsx" : "ts";
    await fs.writeFile(path.join(outDir, `${code}.${ext}`), content);
    staticExports.push(
      `export { default as Flag${safeName} } from './flags/${code}'`,
    );
    lazyStatements.push(`  '${code}': () => import('../flags/${code}')`);
  }

  const componentExports =
    target === "react"
      ? `export { Flag } from './components/Flag'
export { FlagFrame } from './components/FlagFrame'`
      : `export { default as Flag } from './components/Flag.vue'
export { default as FlagFrame } from './components/FlagFrame.vue'`;

  await fs.writeFile(
    indexFile,
    `${componentExports}
export type { BaseFlagProps, FlagCode } from '${corePackage}'
`,
  );

  await fs.writeFile(
    staticEntryFile,
    `${staticExports.join("\n")}
export type { FlagCode } from '${corePackage}'
`,
  );

  await fs.ensureDir(path.dirname(lazyFile));

  if (target === "vue") {
    await fs.writeFile(
      lazyFile,
      `export const lazyRegistry: Record<string, () => Promise<any>> = {
${lazyStatements.join(",\n")}
}
`,
    );
  } else if (target === "react") {
    await fs.writeFile(
      lazyFile,
      `import { lazy, type LazyExoticComponent, type ComponentType } from 'react'
import type { BaseFlagProps } from '@latice/flags-core'

export const lazyRegistry: Record<string, LazyExoticComponent<ComponentType<BaseFlagProps>>> = {
${lazyStatements
  .map((s) => {
    const code = s.match(/import\('\.\.\/flags\/([^']+)'\)/)![1];
    return `  '${code}': lazy(() => import('../flags/${code}'))`;
  })
  .join(",\n")}
}
`,
    );
  }

  console.log(`[@latice/flags] Done: ${codes.size} flags generated`);
}

build().catch((err) => {
  console.error(`[@latice/flags] ` + err);
  process.exit(1);
});
