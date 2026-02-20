"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useTRPC } from "@/trpc/client"
import { useMutation, useQuery } from "@tanstack/react-query"
import { toast } from "sonner"

export default function page() {
  const trpc = useTRPC()
  const { data } = useQuery(trpc.getWorkFlows.queryOptions())
  const { mutate, isPending } = useMutation(trpc.createWorkFlow.mutationOptions({
    onSuccess:
      (data) => toast.success(data.message)
  }))

  return (
    <div>

      <Card>
        <CardHeader>
          {data?.map((workflow, id) => (
            <CardTitle key={workflow.id}>{id + 1 + ") " + workflow.name}</CardTitle>
          ))}
        </CardHeader>
      </Card>
      <CardContent>
        <Button onClick={() => mutate()} disabled={isPending}>
          Create New
        </Button>
      </CardContent>

    </div>


  )
}
