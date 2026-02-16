"use client";

import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";

export default function Test() {
    const trpc = useTRPC();
    const { data } = useSuspenseQuery(trpc.getUsers.queryOptions());
    return (
        <div>  {JSON.stringify(data)}</div>
    )
}
