import WorkflowsList from "@/features/workflows/components/WorkflowsList"
import { requireAuth } from "@/lib/auth-utils"
import { HydrateClient } from "@/trpc/server"
import { Suspense } from "react"
import { ErrorBoundary } from "react-error-boundary"

export default async function WorkflowsPage() {
  await requireAuth()

  return (
    <HydrateClient>
      <ErrorBoundary fallback={<p>Error!</p>}>
        <Suspense fallback={<p>Loading...</p>}>
          <WorkflowsList />
        </Suspense>
      </ErrorBoundary>
    </HydrateClient>
  )
}
