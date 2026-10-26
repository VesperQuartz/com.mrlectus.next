"use client";
import { AiDevtoolsPanel } from "@tanstack/react-ai-devtools";
import { TanStackDevtools } from "@tanstack/react-devtools";
import { formDevtoolsPlugin } from "@tanstack/react-form-devtools";
import { ReactQueryDevtoolsPanel } from "@tanstack/react-query-devtools";
import { tableDevtoolsPlugin } from "@tanstack/react-table-devtools";

export const DevtoolsPanel = () => {
  return (
    <TanStackDevtools
      config={{ position: "bottom-right" }}
      plugins={[
        {
          name: "TanStack Query",
          render: <ReactQueryDevtoolsPanel />,
        },
        // `defaultOpen` mounts the Form panel at load so forms created before the
        // panel is opened are still captured by the devtools event bus.
        { ...formDevtoolsPlugin(), defaultOpen: true },
        {
          name: "TanStack AI",
          render: <AiDevtoolsPanel />,
        },
        tableDevtoolsPlugin(),
      ]}
    />
  );
};
