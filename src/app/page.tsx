import { getQueryClient, trpc } from "@/trpc/server";
import Test from "./test";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Suspense } from "react";

export default function Home() {
  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(trpc.getUsers.queryOptions());
  return (
    <div>
      server
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense fallback={<div>Loading...</div>}>
          <Test />
        </Suspense>
      </HydrationBoundary>
    </div>
  )
}
