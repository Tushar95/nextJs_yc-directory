import StartupForm from "@/components/StartupForm";
import React from "react";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

async function Create() {
  const session = await auth();
  if (!session) redirect("/");
  return (
    <>
      <section className="pink_container !min-h-[230px]">
        <h1 className="heading">Submit your startup</h1>
      </section>

      <StartupForm />
    </>
  );
}

export default Create;
