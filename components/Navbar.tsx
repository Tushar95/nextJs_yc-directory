import React from "react";
import Image from "next/image";
import { auth, signIn, signOut } from "@/auth";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";

async function Navbar() {
  const session = await auth();
  return (
    <>
      <header className="flex justify-between items-center px-6 py-4 shadow-sm ">
        <nav className="flex items-center">
          <Link href="/">
            <Image src="/logo.png" alt="Logo" width={140} height={30} />
          </Link>
        </nav>
        <div className="flex items-center gap-4">
          {session && session?.user ? (
            <>
              <Link href="/startup/create">
                <p>Create</p>
              </Link>
              <form
                action={async () => {
                  "use server";
                  await signOut({ redirectTo: "/" });
                }}
              >
                <button type="submit">Logout</button>
              </form>
              <Link href={`/user/${session?.id}`}>
                <Avatar>
                  <AvatarImage
                    className="size-10 rounded-full"
                    src={session?.user?.image || ""}
                    alt={session?.user?.name || ""}
                  />
                  <AvatarFallback>AV</AvatarFallback>
                </Avatar>
              </Link>
            </>
          ) : (
            <>
              <form
                action={async () => {
                  "use server";
                  await signIn("github");
                }}
              >
                <button type="submit">Login</button>
              </form>
            </>
          )}
        </div>
      </header>
    </>
  );
}

export default Navbar;
