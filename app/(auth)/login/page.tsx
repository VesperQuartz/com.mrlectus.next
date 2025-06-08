"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useActionState } from "react";
import Form from "next/form";
import { signUp } from "@/actions/auth";

const Auth = () => {
  const [_state, action, pending] = useActionState(signUp, undefined);
  return (
    <div>
      <Form action={action}>
        <div className="flex flex-col gap-3 w-fit m-10">
          <Input name="username" placeholder="username" />
          <Input name="email" placeholder="email" type="email" />
          <Input name="password" placeholder="password" type="password" />
          <Button type="submit">{pending ? "Submiting..." : "Signup"}</Button>
        </div>
      </Form>
    </div>
  );
};

export default Auth;
