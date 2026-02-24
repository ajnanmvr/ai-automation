"use client";
import EntityHeader, { EntityContainer } from "@/components/EntityComponents";
import { useCreateWorkflow, useSuspenseWorkflows } from "../hooks/useWorkflows";
import { useRouter } from "next/navigation";
import { useUpgradeModal } from '@/hooks/use-upgrade-modal'




export const WorkflowsList = () => {
  const workflows = useSuspenseWorkflows();
  return <div>{JSON.stringify(workflows.data,null,2)}</div>;
}


export const WorkflowsHeader = ({ disabled }: { disabled?: boolean }) => {
  const createWorkflow = useCreateWorkflow()
  const upgradeModal = useUpgradeModal()

  const router = useRouter()
  const handleCreate = () => {
    createWorkflow.mutate(undefined, {
      onSuccess: (data) => {
        router.push(`/workflows/${data.id}`)
      },
      onError: (error) => {
        upgradeModal.handleError(error)
      }
    }
    )
  }
  return (
    <>
      {upgradeModal.modal}
      
      <EntityHeader
        title="Workflows"
        description="Create and manage workflows"
        disabled={disabled}
        isCreating={createWorkflow.isPending}
        onNew={handleCreate}
        newButtonLabel="New Workflow"
      />
    </>
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