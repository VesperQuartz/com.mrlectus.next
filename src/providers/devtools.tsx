"use client";
import dynamic from "next/dynamic";

const DevtoolsPanel = dynamic(
  () => import("@/providers/devtools-panel").then((mod) => mod.DevtoolsPanel),
  { ssr: false },
);

export const DevtoolsProvider = () => {
  if (process.env.NODE_ENV === "production") return null;

  return <DevtoolsPanel />;
};
