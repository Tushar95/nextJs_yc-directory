import React from "react";
import Ping from "@/components/Ping";
import { STARTUP_VIEWS_BY_ID_QUERY } from "@/sanity/lib/queries";
// import { sanityFetch, SanityLive } from "@/lib/live";
import { client } from "@/sanity/lib/client";
import { formatViews } from "@/lib/utils";
import { writeClient } from "@/sanity/lib/write-client";
import { after } from 'next/server'

async function View({ id }: { id: string }) {
  //   const params = { id: id || null };
  //   const { data: post } = await sanityFetch({
  //     query: STARTUP_VIEWS_BY_ID_QUERY,
  //     params,
  //   });
  const { views: totalViews } = await client
    .withConfig({ useCdn: false })
    .fetch(STARTUP_VIEWS_BY_ID_QUERY, { id });

  after(async () => {
    await writeClient
    .patch(id)
    // .set({ views: totalViews + 1 })
    .inc({ views: 1 })
    .commit();
  })

  return (
    <>
      <div className="view-container">
        <div className="absolute -top-2 -right-2">
          <Ping />
        </div>

        <p className="view-text">
          <span className="font-black">{formatViews(totalViews)}</span>
        </p>
      </div>
    </>
  );
}

export default View;
