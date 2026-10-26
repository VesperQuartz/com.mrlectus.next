import { defineConfig } from "oxlint";

export default defineConfig({
  plugins: ["react", "react-perf", "import", "promise"],
  ignorePatterns: ["./.gitignore", ".next/**", "./output/**"],
});
