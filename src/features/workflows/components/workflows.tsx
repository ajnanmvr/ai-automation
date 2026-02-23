"use client";
import EntityHeader, { EntityContainer } from "@/components/EntityComponents";
import { useCreateWorkflow, useSuspenseWorkflows } from "../hooks/useWorkflows";
import { useRouter } from "next/navigation";

export const WorkflowsList = () => {
  const workflows = useSuspenseWorkflows();
  return <div>{JSON.stringify(workflows.data)}</div>;
}


export const WorkflowsHeader = ({ disabled }: { disabled?: boolean }) => {
  const createWorkflow = useCreateWorkflow()
  const router = useRouter()
  const handleCreate = () => {
    createWorkflow.mutate(undefined, {
      onSuccess: (data) => {
        router.push(`/workflows/${data.id}`)
      },
      onError: (error) => {
        console.error(error)
      }
    }
    )
  }
  return (
    <EntityHeader
      title="Workflows"
      description="Create and manage workflows"
      disabled={disabled}
      isCreating={false}
      onNew={handleCreate}
      newButtonLabel="New Workflow"
    />
  )
}


export const WorkflowsContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <EntityContainer
      header={<WorkflowsHeader />}
    >
      {children}
    </EntityContainer>
  )
}