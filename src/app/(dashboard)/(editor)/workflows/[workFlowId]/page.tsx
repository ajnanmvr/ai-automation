import { prefetchWorkflow } from "@/features/workflows/server/prefetch";
import { HydrateClient } from "@/trpc/server";
import { ErrorBoundary } from "react-error-boundary";
import { Suspense } from "react";
import { Editor, EditorError, EditorHeader, EditorLoading } from "@/features/editor/components/editor";

interface IPageProps {
  params: Promise<{
    workflowId: string;
  }>;
}

export default async function CredentialsPage({ params }: IPageProps) {
  const { workflowId } = await params;
  prefetchWorkflow(workflowId)

  return (
    <HydrateClient>
      <ErrorBoundary fallback={<EditorError />}>
        <Suspense fallback={<EditorLoading />}>
          <EditorHeader workflowId={workflowId} />
          <main className="flex-1">
            <Editor workflowId={workflowId} />
          </main>
        </Suspense>
      </ErrorBoundary>
    </HydrateClient>
  );
}