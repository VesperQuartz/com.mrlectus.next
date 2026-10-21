"use client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { orpc } from "@/lib/orpc";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import React from "react";

export default function Home() {
  const queryClient = useQueryClient();
  const todos = useQuery(orpc.getTodo.queryOptions());
  const createTodo = useMutation(
    orpc.createTodo.mutationOptions({
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: orpc.getTodo.queryKey(),
        });
      },
    }),
  );
  const [name, setName] = React.useState("");
  console.log(todos.data);

  return (
    <div className="grid min-h-screen grid-rows-[20px_1fr_20px] items-center justify-items-center gap-16 p-8 pb-20 font-(family-name:--font-geist-sans) sm:p-20">
      <pre className="text-sm">{JSON.stringify(todos.data, null, 2)}</pre>
      <form
        className="flex gap-3"
        onSubmit={async (e) => {
          e.preventDefault();
          e.stopPropagation();
          await createTodo.mutateAsync({
            name,
          });
        }}
      >
        <Input
          onChange={(e) => {
            setName(e.target.value);
          }}
          name="name"
          placeholder="Enter Name"
          className="border-2 border-primary"
        />
        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
}
