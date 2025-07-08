import { client } from "@/sanity/lib/client";
import React from "react";
import { STARTUP_QUERY_BY_AUTHOR_ID } from "@/sanity/lib/queries";
import StartupCard, { StartupCardType } from "./StartupCard";

async function UserStartups({ id }: { id: string }) {
  const startups = await client
    .withConfig({ useCdn: false })
    .fetch(STARTUP_QUERY_BY_AUTHOR_ID, { id });
  console.log("startups received", startups);
  return (
    <>
      {startups.length > 0 ? (
        startups.map((startup: StartupCardType) => (
          <StartupCard key={startup._id} post={startup} />
        ))
      ) : (
        <p className="no-result">No posts yet</p>
      )}
    </>
  );
}

export default UserStartups;
