"use client";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { orpc } from "@/lib/orpc";

export default function Home() {
  const todos = useQuery(orpc.getTodo.queryOptions());
  return (
    <div className="grid min-h-screen grid-rows-[20px_1fr_20px] items-center justify-items-center gap-16 p-8 pb-20 font-(family-name:--font-geist-sans) sm:p-20">
      <Image
        placeholder="blur"
        quality={75}
        width={500}
        height={500}
        src=""
        alt=""
      />
      Hello {todos.data?.[0].name}
    </div>
  );
}
