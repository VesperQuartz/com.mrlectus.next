import { todoSchema } from "../schema";
import { base } from "./base";

const names: unknown[] = [];

export const createTodo = base
  .route({
    method: "POST",
    path: "/todos",
  })
  .input(todoSchema)
  .handler(({ input }) => {
    console.log(input);
    const box = [...names, input.name];
    console.log(box);
    return box;
  });

export const getTodo = base
  .route({
    method: "GET",
    path: "/todos",
  })
  .handler(() => {
    return names;
  });
