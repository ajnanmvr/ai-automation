"use client"
import { useSuspenseWorkflow } from '@/features/workflows/hooks/use-workflows'

export function Editor({ workflowId }: { workflowId: string }) {
    const { data: workflow } = useSuspenseWorkflow(workflowId)
    return (
        <div>{JSON.stringify(workflow, null, 2)}</div>
    )
}
