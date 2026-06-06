import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";
import { resolve } from "path";

export default defineConfig({
  plugins: [
    react(),
    dts({
      rollupTypes: true,
      outDir: "dist",
    }),
  ],
  build: {
    lib: {
      entry: {
        index: resolve(__dirname, "src/index.ts"),
        static: resolve(__dirname, "src/static-entry.ts"),
      },
      name: "@latice/flags-react",
      fileName: (format, entryName) => `${entryName}.${format}.js`,
      formats: ["es"],
    },
    rollupOptions: {
      external: ["react", "react/jsx-runtime"],
      output: {
        globals: {
          react: "React",
        },
      },
    },
  },
});
