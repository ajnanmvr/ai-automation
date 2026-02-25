import { WorkflowsContainer, WorkflowsError, WorkflowsList, WorkflowsLoading } from "@/features/workflows/components/workflows";
import { workflowParamsLoader } from "@/features/workflows/server/params-loader";
import { prefetchWorkflows } from "@/features/workflows/server/prefetch";
import { requireAuth } from "@/lib/auth-utils";
import { HydrateClient } from "@/trpc/server";
import type { SearchParams } from "nuqs/server";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

type TWorkflowsPageProps = {
  searchParams: Promise<SearchParams>
}

export default async function WorkflowsPage({ searchParams }: TWorkflowsPageProps) {
  await requireAuth();
  const params = await workflowParamsLoader(searchParams)

  prefetchWorkflows(params);

  return (
    <WorkflowsContainer>
      <HydrateClient>
        <ErrorBoundary fallback={<WorkflowsError />}>
          <Suspense fallback={<WorkflowsLoading />}>
            <WorkflowsList />
          </Suspense>
        </ErrorBoundary>
      </HydrateClient>
    </WorkflowsContainer>
  );
}
