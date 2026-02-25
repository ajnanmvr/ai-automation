"use client"
import { LoadingView } from '@/components/entity-components'
import { useSuspenseWorkflow } from '@/features/workflows/hooks/use-workflows'

export const Editor = ({ workflowId }: { workflowId: string }) => {
    const { data: workflow } = useSuspenseWorkflow(workflowId)
    return (
        <div>{JSON.stringify(workflow, null, 2)}</div>
    )
}

export const EditorLoading = () => {
    return <LoadingView message='Loading editor...' />
}
export const EditorError = () => {
    return <LoadingView message='Error loading editor' />
}